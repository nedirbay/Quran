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

export const localAudio = reactive({
  loaded: false,
  reciters: [] as string[],
  words: false,
})

export function applyLocalAudioManifest(m: Partial<LocalAudioManifest> | null) {
  localAudio.reciters = Object.keys(m?.ayahs ?? {})
  localAudio.words = !!m?.words
  localAudio.loaded = true
}

export async function loadLocalAudioManifest(): Promise<void> {
  try {
    const res = await fetch(`${import.meta.env.BASE_URL}audio/manifest.json`, { cache: 'no-cache' })
    const type = res.headers.get('content-type') ?? ''
    // Dev serwer ýok faýlyň ýerine index.html gaýtarýar — ony manifest hasaplamaýarys
    applyLocalAudioManifest(res.ok && type.includes('json') ? await res.json() : null)
  } catch {
    applyLocalAudioManifest(null)
  }
}
