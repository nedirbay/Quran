import { ref, shallowRef } from 'vue'
import type { AudioRequest } from '@/types'

/**
 * Ýeke-täk audio hyzmaty.
 *
 * Tertip:
 *  1. `url` berlen bolsa — faýly oýnadýar (birnäçe bolsa: tertip boýunça, mysal ýerli → onlaýn).
 *  2. Hiç bir faýl ýüklenip bilinmese (404, offline) — `ttsText` brauzeriň arapça
 *     Speech Synthesis sesi bilen okalýar.
 *
 * Bir wagtda diňe bir ses ýaňlanýar; täze ses öňküsini togtadýar.
 */

/** Häzir ýaňlanýan sesiň açary (UI-da “oýnaýar” ýagdaýyny görkezmek üçin) */
const playingKey = ref<string | null>(null)
const arabicVoice = shallowRef<SpeechSynthesisVoice | null>(null)
/**
 * Ses çykaryp bolmadyk ýagdaýy barada UI-a habar (AudioNotice görkezýär).
 * 'no-arabic-voice' — enjamda/brauzerde arapça TTS sesi ýok.
 * 'network' — onlaýn ses faýly ýüklenmedi (internet ýok) we TTS hem kömek etmedi.
 */
export type AudioNotice = 'no-arabic-voice' | 'network'
const notice = ref<AudioNotice | null>(null)
const ttsSupported = typeof window !== 'undefined' && 'speechSynthesis' in window

const failedUrls = new Set<string>()
let current: HTMLAudioElement | null = null
let token = 0

function pickArabicVoice() {
  if (!ttsSupported) return
  const arabic = window.speechSynthesis.getVoices().filter((v) => v.lang.toLowerCase().startsWith('ar'))
  // Tebigy (Natural / Online) sesleri öňe çykarýarys — has düşnükli okaýarlar
  const score = (v: SpeechSynthesisVoice) =>
    (/natural|online|neural/i.test(v.name) ? 2 : 0) + (v.lang.toLowerCase() === 'ar-sa' ? 1 : 0)
  arabicVoice.value = arabic.sort((a, b) => score(b) - score(a))[0] ?? null
}

if (ttsSupported) {
  pickArabicVoice()
  window.speechSynthesis.addEventListener?.('voiceschanged', pickArabicVoice)
}

/** Ýaňlanýan faýlyň garaşylýan wadasyny ýapmak üçin */
let cancelPending: (() => void) | null = null

function stop() {
  token++
  cancelPending?.()
  cancelPending = null
  if (current) {
    current.pause()
    current.removeAttribute('src')
    current = null
  }
  if (ttsSupported) window.speechSynthesis.cancel()
  playingKey.value = null
}

function playFile(url: string, rate: number): Promise<void> {
  return new Promise((resolve, reject) => {
    const el = new Audio(url)
    el.preload = 'auto'
    el.playbackRate = rate
    current = el
    cancelPending = resolve
    el.addEventListener('ended', () => resolve(), { once: true })
    el.addEventListener('error', () => reject(new Error('audio-error')), { once: true })
    el.play().catch(reject)
  })
}

/**
 * Arapça teksti TTS bilen okaýar. Ses 2 sekundyň içinde başlamasa
 * (arapça ses ýok ýa-da brauzer goldamaýar) — `false` gaýtarýar.
 */
function speak(text: string, rate: number): Promise<boolean> {
  return new Promise((resolve) => {
    if (!ttsSupported) return resolve(false)
    const synth = window.speechSynthesis
    // Ses sanawy ýüklenen, ýöne arapça ýok — okamaga synanyşmagyň manysy ýok
    if (!arabicVoice.value && synth.getVoices().length > 0) return resolve(false)

    const u = new SpeechSynthesisUtterance(text)
    u.lang = arabicVoice.value?.lang ?? 'ar-SA'
    if (arabicVoice.value) u.voice = arabicVoice.value
    u.rate = Math.max(0.5, Math.min(1.2, rate * 0.85))

    let started = false
    let done = false
    const finish = (ok: boolean) => {
      if (done) return
      done = true
      clearTimeout(startTimer)
      clearTimeout(endTimer)
      resolve(ok)
    }
    u.onstart = () => (started = true)
    u.onend = () => finish(started)
    u.onerror = () => finish(false)
    const startTimer = setTimeout(() => {
      if (!started) {
        synth.cancel()
        finish(false)
      }
    }, 2000)
    // Käbir brauzerler `onend` ibermeýär — düwme “oýnaýar” ýagdaýynda galmasyn
    const endTimer = setTimeout(() => finish(started), Math.max(5000, text.length * 600))
    synth.speak(u)
  })
}

/**
 * Sesi oýnadýar. `key` — UI-da haýsy düwmäniň işjeňdigini bilmek üçin.
 * Şol açar bilen ses eýýäm ýaňlanýan bolsa — togtadýar (toggle).
 */
async function play(req: AudioRequest, key: string, rate = 1): Promise<void> {
  if (playingKey.value === key) {
    stop()
    return
  }
  stop()
  const myToken = token
  playingKey.value = key

  try {
    const all = [req.url ?? []].flat()
    const urls = all.filter((u) => !failedUrls.has(u))
    for (const url of urls) {
      try {
        await playFile(url, rate)
        return
      } catch {
        if (myToken !== token) return // ulanyjy özi togtatdy
        failedUrls.add(url)
      }
    }
    if (req.ttsText) {
      const ok = await speak(req.ttsText, rate)
      if (!ok && myToken === token) {
        // Onlaýn faýl hem şowsuz bolsa — esasy sebäp internet
        notice.value = all.some((u) => /^https?:/.test(u)) ? 'network' : 'no-arabic-voice'
      }
    }
  } finally {
    if (myToken === token) playingKey.value = null
  }
}

export function useAudio() {
  return {
    play,
    stop,
    playingKey,
    ttsSupported,
    arabicVoice,
    notice,
    dismissNotice: () => (notice.value = null),
    isPlaying: (key: string) => playingKey.value === key,
  }
}
