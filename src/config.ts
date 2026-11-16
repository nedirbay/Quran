/**
 * Programmanyň sazlamalary: audio çeşmeleri we ş.m.
 * Onlaýn çeşmeler elýeterli bolmasa, brauzeriň arapça TTS-i ulanylýar.
 */

import { localAudio } from '@/services/localAudio'

const pad3 = (n: number) => String(n).padStart(3, '0')
const BASE = import.meta.env.BASE_URL

export interface Reciter {
  id: string
  name: string
}

/** everyayah.com papkalary — aýatlaryň doly okalyşy */
export const RECITERS: Reciter[] = [
  { id: 'Husary_128kbps', name: 'Mahmud Halil el-Husary (öwrenmek üçin haýal)' },
  { id: 'Alafasy_128kbps', name: 'Mişary Raşid el-Afasy' },
  { id: 'Abdul_Basit_Murattal_192kbps', name: 'Abdulbasit Abdussamed (murattal)' },
]

export const audioUrls = {
  /** Aýatyň doly okalyşy */
  ayah: (reciter: string, surah: number, ayah: number) =>
    `https://everyayah.com/data/${reciter}/${pad3(surah)}${pad3(ayah)}.mp3`,

  /** Sözme-söz okalyş (quran.com CDN). `word` — aýatdaky 1-den başlaýan orny */
  word: (surah: number, ayah: number, word: number) =>
    `https://audio.qurancdn.com/wbw/${pad3(surah)}_${pad3(ayah)}_${pad3(word)}.mp3`,

  /**
   * Harplaryň ýazgylary üçin ýerli faýllar (islege görä).
   * `public/audio/letters/<id>.mp3` goýulsa, TTS-iň ýerine şol ulanylýar.
   */
  letter: (letterId: string) => `${BASE}audio/letters/${letterId}.mp3`,

  /** `npm run audio` bilen ýüklenen ýerli faýllar */
  ayahLocal: (reciter: string, surah: number, ayah: number) =>
    `${BASE}audio/ayahs/${reciter}/${pad3(surah)}${pad3(ayah)}.mp3`,
  wordLocal: (surah: number, ayah: number, word: number) =>
    `${BASE}audio/words/${pad3(surah)}_${pad3(ayah)}_${pad3(word)}.mp3`,

  /** Aýat sesi: ilki ýerli faýl (ýüklenen bolsa), soňra onlaýn */
  ayahSources(reciter: string, surah: number, ayah: number): string[] {
    const online = audioUrls.ayah(reciter, surah, ayah)
    return localAudio.reciters.includes(reciter) ? [audioUrls.ayahLocal(reciter, surah, ayah), online] : [online]
  },

  /** Söz sesi: ilki ýerli faýl (ýüklenen bolsa), soňra onlaýn */
  wordSources(surah: number, ayah: number, word: number): string[] {
    const online = audioUrls.word(surah, ayah, word)
    return localAudio.words ? [audioUrls.wordLocal(surah, ayah, word), online] : [online]
  },
}

export const STORAGE_PREFIX = 'kuran-owren:v1:'

/**
 * GitHub Sponsors — programmadaky “Goldaw” düwmeleri şu salgy açýar.
 * Repozitoriýadaky “Sponsor” düwmesi üçin `.github/FUNDING.yml` faýlyna serediň.
 */
export const SPONSOR = {
  githubUser: 'nedirbay',
  url: 'https://github.com/sponsors/nedirbay',
} as const
