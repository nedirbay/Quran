import { ref, shallowRef } from 'vue'
import type { AudioRequest } from '@/types'

/**
 * Ýeke-täk audio hyzmaty.
 *
 * Tertip:
 *  1. `url` berlen bolsa — faýly oýnadýar.
 *  2. Faýl ýüklenip bilinmese (404, offline) — `ttsText` brauzeriň arapça
 *     Speech Synthesis sesi bilen okalýar.
 *
 * Bir wagtda diňe bir ses ýaňlanýar; täze ses öňküsini togtadýar.
 */

/** Häzir ýaňlanýan sesiň açary (UI-da “oýnaýar” ýagdaýyny görkezmek üçin) */
const playingKey = ref<string | null>(null)
const arabicVoice = shallowRef<SpeechSynthesisVoice | null>(null)
const ttsSupported = typeof window !== 'undefined' && 'speechSynthesis' in window

const failedUrls = new Set<string>()
let current: HTMLAudioElement | null = null
let token = 0

function pickArabicVoice() {
  if (!ttsSupported) return
  const voices = window.speechSynthesis.getVoices()
  arabicVoice.value =
    voices.find((v) => v.lang === 'ar-SA') ?? voices.find((v) => v.lang.toLowerCase().startsWith('ar')) ?? null
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

function speak(text: string, rate: number): Promise<void> {
  return new Promise((resolve) => {
    if (!ttsSupported) return resolve()
    const u = new SpeechSynthesisUtterance(text)
    u.lang = arabicVoice.value?.lang ?? 'ar-SA'
    if (arabicVoice.value) u.voice = arabicVoice.value
    u.rate = Math.max(0.5, Math.min(1.2, rate * 0.85))
    u.onend = () => resolve()
    u.onerror = () => resolve()
    window.speechSynthesis.speak(u)
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
    if (req.url && !failedUrls.has(req.url)) {
      try {
        await playFile(req.url, rate)
        return
      } catch {
        if (myToken !== token) return // ulanyjy özi togtatdy
        failedUrls.add(req.url)
      }
    }
    if (req.ttsText) await speak(req.ttsText, rate)
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
    isPlaying: (key: string) => playingKey.value === key,
  }
}
