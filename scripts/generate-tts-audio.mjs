#!/usr/bin/env node
/**
 * Harplaryň, bogunlaryň, mysal sözleriň we tejwid mysallarynyň sesini
 * Microsoft Edge “Read aloud” Neural sesleri (msedge-tts) bilen mp3 görnüşinde döredýär.
 *
 *   npm run audio:tts                                  # ähli faýllar (Hamed sesi)
 *   npm run audio:tts -- --voice=ar-SA-ZariyahNeural   # aýal sesi
 *   npm run audio:tts -- --only=letters                # diňe harplar/bogunlar
 *   npm run audio:tts -- --rate=-25%                   # has haýal
 *   npm run audio:tts -- --force                       # bar faýllary täzeden döretmek
 *   npm run audio:tts -- --dry-run                     # diňe sanawy görkezmek
 *
 * Çykyş (git-e goşulmaýar):
 *   public/audio/letters/<id>.mp3, <id>-a|i|u.mp3
 *   public/audio/examples/ex-<letterId>.mp3, rule-<ruleId>-<i>.mp3
 *   public/audio/tts.json
 *
 * Bar faýllar (mysal, el bilen ýazga alnan) --force bolmasa üýtgedilmeýär.
 * ÜNS BERIŇ: edge-tts resmi API däl; döredilen sesleri bir mugallym diňläp barlamaly.
 */
import { existsSync, mkdirSync, readdirSync, renameSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { LETTERS } from '../src/data/letters.ts'
import { TAJWEED_RULES } from '../src/data/tajweed.ts'
import { letterSyllables } from '../src/utils/arabic.ts'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const OUT = join(ROOT, 'public', 'audio')
const CONCURRENCY = 2
const RETRIES = 3
const TIMEOUT_MS = 30_000
const MIN_BYTES = 1024

/* ------------------------------ Parametrler ------------------------------ */

const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const [k, ...v] = a.replace(/^--/, '').split('=')
    return [k, v.length ? v.join('=') : true]
  }),
)
const voice = typeof args.voice === 'string' ? args.voice : 'ar-SA-HamedNeural'
const rate = typeof args.rate === 'string' ? args.rate : '-15%'
const only = typeof args.only === 'string' ? args.only : null
const force = !!args.force
const dryRun = !!args['dry-run']
const fake = process.env.TTS_FAKE === '1'

/* ------------------------------ Näme gerek? ------------------------------ */

/** Her ýazgy: faýl ýoly, okaljak tekst, topar */
function collectJobs() {
  const jobs = []
  if (!only || only === 'letters') {
    for (const l of LETTERS) {
      jobs.push({ group: 'letters', file: join('letters', `${l.id}.mp3`), text: l.arabicName })
      // Bogunlar gysga — haýalrak okadýarys, ses aýdyň bolsun
      for (const s of letterSyllables(l)) {
        jobs.push({ group: 'letters', file: join('letters', `${s.key}.mp3`), text: s.text, slow: true })
      }
    }
  }
  if (!only || only === 'examples') {
    for (const l of LETTERS) {
      jobs.push({ group: 'examples', file: join('examples', `ex-${l.id}.mp3`), text: l.example.arabic })
    }
    for (const r of TAJWEED_RULES) {
      r.examples.forEach((ex, i) => {
        jobs.push({ group: 'examples', file: join('examples', `rule-${r.id}-${i}.mp3`), text: ex.arabic })
      })
    }
  }
  return jobs
}

/* ------------------------------- Sintez ---------------------------------- */

/** Synag üçin: hyzmata baglanmazdan kiçi “mp3” ýazýar */
async function fakeSynth(text) {
  return Buffer.concat([Buffer.from('ID3'), Buffer.alloc(2048, text.length % 256)])
}

async function createEdgeSynth() {
  const pkg = await import('msedge-tts')
  const { MsEdgeTTS, OUTPUT_FORMAT } = pkg.default ?? pkg
  const tts = new MsEdgeTTS()
  await tts.setMetadata(voice, OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3)

  const synth = (text, prosody) =>
    new Promise((resolve, reject) => {
      const chunks = []
      const timer = setTimeout(() => reject(new Error('wagt gutardy')), TIMEOUT_MS)
      const { audioStream } = tts.toStream(text, prosody)
      audioStream.on('data', (c) => chunks.push(c))
      audioStream.on('end', () => {
        clearTimeout(timer)
        resolve(Buffer.concat(chunks))
      })
      audioStream.on('error', (e) => {
        clearTimeout(timer)
        reject(e)
      })
    })
  return { synth, close: () => tts.close() }
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

async function produce(job, synth) {
  const dest = join(OUT, job.file)
  if (existsSync(dest) && !force) return 'skipped'
  let lastError
  for (let attempt = 1; attempt <= RETRIES; attempt++) {
    try {
      const buf = await synth(job.text, job.slow ? { rate } : { rate: '-5%' })
      if (buf.length < MIN_BYTES) throw new Error(`ses gaty gysga (${buf.length} baýt)`)
      mkdirSync(dirname(dest), { recursive: true })
      writeFileSync(dest + '.part', buf)
      renameSync(dest + '.part', dest)
      return 'created'
    } catch (err) {
      lastError = err
      if (attempt < RETRIES) await sleep(1000 * attempt)
    }
  }
  throw new Error(`${job.file} (${job.text}) → ${lastError?.message ?? lastError}`)
}

/* --------------------------------- Esasy --------------------------------- */

const jobs = collectJobs()
console.log(`Ses: ${voice}, ýazgy sany: ${jobs.length}${fake ? ' (TTS_FAKE — synag tertibi)' : ''}`)

if (dryRun) {
  for (const j of jobs) console.log(`  ${j.file.padEnd(34)} ${j.text}`)
  process.exit(0)
}

let engine
try {
  engine = fake ? { synth: fakeSynth, close() {} } : await createEdgeSynth()
} catch (err) {
  const reason = err?.cause?.code ?? err?.code ?? err?.message ?? String(err)
  console.error(`\n✗ Microsoft Edge TTS hyzmatyna birikip bolmady (${reason}).`)
  console.error('  • Internet baglanyşygyny barlaň (speech.platform.bing.com açyk bolmaly).')
  console.error(`  • Ses adyny barlaň: “${voice}” (mysal: ar-SA-HamedNeural, ar-SA-ZariyahNeural).`)
  console.error('  • Hyzmat resmi däl — işlemese, birnäçe wagtdan soň gaýtadan synanyşyň ýa-da msedge-tts paketini täzeläň.')
  process.exit(1)
}
const stats = { created: 0, skipped: 0, failed: [] }
let next = 0
let done = 0
async function worker() {
  while (next < jobs.length) {
    const job = jobs[next++]
    try {
      stats[await produce(job, engine.synth)]++
    } catch (err) {
      stats.failed.push(err.message)
    }
    done++
    if (process.stdout.isTTY) process.stdout.write(`\r  ${done}/${jobs.length}`)
  }
}
try {
  await Promise.all(Array.from({ length: CONCURRENCY }, worker))
} finally {
  engine.close()
}
if (process.stdout.isTTY) process.stdout.write('\n')

console.log(`  ${stats.created} döredildi, ${stats.skipped} öňden bardy, ${stats.failed.length} ýalňyş`)
stats.failed.slice(0, 5).forEach((m) => console.log(`    ✗ ${m}`))
if (stats.failed.length > 5) console.log(`    … we ýene ${stats.failed.length - 5}`)

/* ------------------- Manifest: diskdäki faýllara görä -------------------- */

const count = (dir) => (existsSync(join(OUT, dir)) ? readdirSync(join(OUT, dir)).filter((f) => f.endsWith('.mp3')).length : 0)
const manifest = {
  voice,
  letters: count('letters'),
  examples: count('examples'),
  generatedAt: new Date().toISOString(),
}
mkdirSync(OUT, { recursive: true })
writeFileSync(join(OUT, 'tts.json'), JSON.stringify(manifest, null, 2) + '\n')
console.log(`\ntts.json: ${manifest.letters} harp faýly, ${manifest.examples} mysal faýly`)

if (stats.failed.length) {
  console.log('\nKäbir faýllar döredilmedi. Internet baglanyşygyny barlap, buýrugy gaýtadan işlediň — bar faýllar geçiler.')
  process.exitCode = 1
}
