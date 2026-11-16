import { reactive } from 'vue'

/**
 * `npm run audio` bilen ýüklenen offline sesler.
 * Manifest ýok bolsa (sesler ýüklenmedik) ýerli faýllar asla soralmaýar —
 * artykmaç 404 soraglary bolmaz.
 */
export interface LocalAudioManifest {
  /** Doly ýüklenen karylar → faýl sany */
  ayahs: Record<string, number>
  words: boolean
}

/** scripts/generate-tts-audio.mjs döreden harp/mysal sesleri */
export interface TtsManifest {
  voice: string
  letters: number
  examples: number
}

export const localAudio = reactive({
  loaded: false,
  reciters: [] as string[],
  words: false,
  ttsVoice: null as string | null,
  ttsLetters: 0,
  ttsExamples: 0,
})

export function applyLocalAudioManifest(m: Partial<LocalAudioManifest> | null) {
  localAudio.reciters = Object.keys(m?.ayahs ?? {})
  localAudio.words = !!m?.words
  localAudio.loaded = true
}

export function applyTtsManifest(m: Partial<TtsManifest> | null) {
  localAudio.ttsVoice = m?.voice ?? null
  localAudio.ttsLetters = m?.letters ?? 0
  localAudio.ttsExamples = m?.examples ?? 0
}

/** JSON faýly okaýar; ýok bolsa null (dev serwer ýok faýlyň ýerine index.html gaýtarýar — ony hasaplamaýarys) */
async function fetchJson<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${import.meta.env.BASE_URL}${path}`, { cache: 'no-cache' })
    const type = res.headers.get('content-type') ?? ''
    return res.ok && type.includes('json') ? ((await res.json()) as T) : null
  } catch {
    return null
  }
}

export async function loadLocalAudioManifest(): Promise<void> {
  const [main, tts] = await Promise.all([
    fetchJson<LocalAudioManifest>('audio/manifest.json'),
    fetchJson<TtsManifest>('audio/tts.json'),
  ])
  applyTtsManifest(tts)
  applyLocalAudioManifest(main)
}
