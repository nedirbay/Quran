#!/usr/bin/env node
/**
 * Programmadaky aýatlaryň we sözleriň sesini offline ulanmak üçin ýükleýär.
 *
 *   npm run audio                                  # esasy kary + sözme-söz ses
 *   npm run audio -- --reciter=Alafasy_128kbps     # başga kary
 *   npm run audio -- --reciter=Husary_128kbps,Alafasy_128kbps
 *   npm run audio -- --no-words                    # diňe aýatlar
 *
 * Çykyş (git-e goşulmaýar):
 *   public/audio/ayahs/<reciter>/SSSAAA.mp3   ← everyayah.com
 *   public/audio/words/SSS_AAA_WWW.mp3        ← audio.qurancdn.com (quran.com)
 *   public/audio/manifest.json                ← programma haýsy sesleriň bardygyny şundan bilýär
 *
 * Bar faýllar geçilýär — ýarym galsa, gaýtadan işletmek ýeterlik.
 */
import { existsSync, mkdirSync, readdirSync, readFileSync, renameSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const DATA = join(ROOT, 'src', 'data')
const OUT = join(ROOT, 'public', 'audio')

const CONCURRENCY = 4
const RETRIES = 3
const MIN_BYTES = 1024

/* ------------------------------ Parametrler ------------------------------ */

const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const [k, ...v] = a.replace(/^--/, '').split('=')
    return [k, v.length ? v.join('=') : true]
  }),
)

/** Karylaryň sanawy src/config.ts-den (birinjisi — esasy) */
function configReciters() {
  const src = readFileSync(join(ROOT, 'src', 'config.ts'), 'utf8')
  const block = src.match(/RECITERS[^=]*=\s*\[([\s\S]*?)\n\]/)?.[1] ?? ''
  const ids = [...block.matchAll(/id: '([^']+)'/g)].map((m) => m[1])
  if (!ids.length) throw new Error('src/config.ts içinde RECITERS sanawy tapylmady')
  return ids
}

const known = configReciters()
const reciters = typeof args.reciter === 'string' ? args.reciter.split(',').filter(Boolean) : [known[0]]
const withWords = !args['no-words']
const ayahBase = (typeof args['ayah-base'] === 'string' ? args['ayah-base'] : 'https://everyayah.com/data').replace(/\/$/, '')
const wordBase = (typeof args['word-base'] === 'string' ? args['word-base'] : 'https://audio.qurancdn.com/wbw').replace(/\/$/, '')

for (const r of reciters) {
  if (!known.includes(r)) console.warn(`⚠ “${r}” src/config.ts → RECITERS sanawynda ýok; programmada saýlap bolmaz.`)
}

/* ------------------------------ Näme gerek? ------------------------------ */

const pad = (n) => String(n).padStart(3, '0')

function collect() {
  const ayahs = new Set()
  const words = []
  const surahFiles = readdirSync(join(DATA, 'quran')).filter((f) => /^surah-\d+\.json$/.test(f))
  for (const f of surahFiles) {
    const surah = JSON.parse(readFileSync(join(DATA, 'quran', f), 'utf8'))
    for (const a of surah.ayahs) {
      ayahs.add(`${surah.id}:${a.number}`)
      // src/utils/arabic.ts → splitWords bilen birmeňzeş düzgün
      const count = a.arabic.trim().split(/\s+/u).filter(Boolean).length
      for (let w = 1; w <= count; w++) words.push([surah.id, a.number, w])
    }
  }
  // “Kitaplar we pygamberler” bölümindäki esasy aýatlar
  const history = JSON.parse(readFileSync(join(DATA, 'history-ayahs.json'), 'utf8'))
  Object.keys(history).forEach((k) => ayahs.add(k))

  const sorted = [...ayahs]
    .map((k) => k.split(':').map(Number))
    .sort((a, b) => a[0] - b[0] || a[1] - b[1])
  return { ayahs: sorted, words }
}

/* ------------------------------- Ýüklemek -------------------------------- */

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

async function download(url, dest) {
  if (existsSync(dest)) return 'skipped'
  let lastError
  for (let attempt = 1; attempt <= RETRIES; attempt++) {
    try {
      const res = await fetch(url)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const type = res.headers.get('content-type') ?? ''
      if (type.includes('text/html')) throw new Error(`garaşylmadyk jogap (${type})`)
      const buf = Buffer.from(await res.arrayBuffer())
      if (buf.length < MIN_BYTES) throw new Error(`faýl gaty kiçi (${buf.length} baýt)`)
      mkdirSync(dirname(dest), { recursive: true })
      // Ilki wagtlaýyn faýla ýazýarys — kesilse ýarym faýl galmasyn
      writeFileSync(dest + '.part', buf)
      renameSync(dest + '.part', dest)
      return 'downloaded'
    } catch (err) {
      lastError = err
      if (attempt < RETRIES) await sleep(500 * 2 ** attempt)
    }
  }
  throw new Error(`${url} → ${lastError?.message ?? lastError}`)
}

async function runAll(jobs, label) {
  const stats = { downloaded: 0, skipped: 0, failed: [] }
  let next = 0
  let done = 0
  async function worker() {
    while (next < jobs.length) {
      const job = jobs[next++]
      try {
        stats[await download(job.url, job.dest)]++
      } catch (err) {
        stats.failed.push(err.message)
      }
      done++
      if (process.stdout.isTTY) process.stdout.write(`\r  ${label}: ${done}/${jobs.length}`)
    }
  }
  await Promise.all(Array.from({ length: CONCURRENCY }, worker))
  if (process.stdout.isTTY) process.stdout.write('\n')
  console.log(
    `  ${label}: ${stats.downloaded} ýüklendi, ${stats.skipped} öňden bardy, ${stats.failed.length} ýalňyş`,
  )
  stats.failed.slice(0, 5).forEach((m) => console.log(`    ✗ ${m}`))
  if (stats.failed.length > 5) console.log(`    … we ýene ${stats.failed.length - 5}`)
  return stats
}

/* --------------------------------- Esasy --------------------------------- */

const { ayahs, words } = collect()
console.log(`Aýatlar: ${ayahs.length}, sözler: ${withWords ? words.length : '(geçildi)'}, karylar: ${reciters.join(', ')}`)

let failed = 0
for (const reciter of reciters) {
  const jobs = ayahs.map(([s, a]) => ({
    url: `${ayahBase}/${reciter}/${pad(s)}${pad(a)}.mp3`,
    dest: join(OUT, 'ayahs', reciter, `${pad(s)}${pad(a)}.mp3`),
  }))
  failed += (await runAll(jobs, `Aýatlar (${reciter})`)).failed.length
}

if (withWords) {
  const jobs = words.map(([s, a, w]) => ({
    url: `${wordBase}/${pad(s)}_${pad(a)}_${pad(w)}.mp3`,
    dest: join(OUT, 'words', `${pad(s)}_${pad(a)}_${pad(w)}.mp3`),
  }))
  failed += (await runAll(jobs, 'Sözler')).failed.length
}

/* ------------- Manifest: diňe doly ýüklenen toplumlar ýazylýar ------------ */

const count = (dir, re) => (existsSync(dir) ? readdirSync(dir).filter((f) => re.test(f)).length : 0)
const manifest = { ayahs: {}, words: false, ayahCount: ayahs.length, wordCount: words.length, generatedAt: new Date().toISOString() }

const ayahDir = join(OUT, 'ayahs')
if (existsSync(ayahDir)) {
  for (const r of readdirSync(ayahDir)) {
    const have = count(join(ayahDir, r), /^\d{6}\.mp3$/)
    if (have >= ayahs.length) manifest.ayahs[r] = have
  }
}
manifest.words = count(join(OUT, 'words'), /^\d{3}_\d{3}_\d{3}\.mp3$/) >= words.length

mkdirSync(OUT, { recursive: true })
writeFileSync(join(OUT, 'manifest.json'), JSON.stringify(manifest, null, 2) + '\n')

const offline = Object.keys(manifest.ayahs)
console.log(
  `\nManifest: offline karylar — ${offline.length ? offline.join(', ') : 'ýok'}; sözme-söz — ${manifest.words ? 'bar' : 'ýok'}`,
)
if (failed) {
  console.log(`\n${failed} faýl ýüklenmedi. Internet baglanyşygyny barlap, buýrugy gaýtadan işlediň — bar faýllar geçiler.`)
  process.exitCode = 1
}
