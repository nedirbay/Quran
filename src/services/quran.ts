import type { Surah, SurahMeta } from '@/types'
import index from '@/data/quran/index.json'

/**
 * Kuran maglumat gatlagy (repository).
 * Häzir maglumatlar programmanyň içinde (JSON) saklanýar we her süre aýratyn
 * bölek (chunk) bolup diňe gerek wagty ýüklenýär. Geljekde API-a geçmek üçin
 * diňe şu faýly üýtgetmek ýeterlik.
 */

export const SURAH_INDEX: SurahMeta[] = index as SurahMeta[]

const loaders = import.meta.glob<{ default: Surah }>('../data/quran/surah-*.json')
const cache = new Map<number, Surah>()

export function getSurahMeta(id: number): SurahMeta | undefined {
  return SURAH_INDEX.find((s) => s.id === id)
}

export async function getSurah(id: number): Promise<Surah | null> {
  const hit = cache.get(id)
  if (hit) return hit
  const key = Object.keys(loaders).find((k) => k.endsWith(`surah-${String(id).padStart(3, '0')}.json`))
  if (!key) return null
  const mod = await loaders[key]!()
  cache.set(id, mod.default)
  return mod.default
}

/** Tertip boýunça indiki / öňki elýeterli süre */
export function neighbourSurah(id: number, dir: 1 | -1): SurahMeta | undefined {
  const i = SURAH_INDEX.findIndex((s) => s.id === id)
  return SURAH_INDEX[i + dir]
}

/** Fatihadan (1) we Tewbeden (9) başga sürelerde aýatlardan öň Besmele okalýar */
export const BASMALA = 'بِسۡمِ ٱللَّهِ ٱلرَّحۡمَٰنِ ٱلرَّحِيمِ'
export const hasBasmalaHeader = (id: number) => id !== 1 && id !== 9
