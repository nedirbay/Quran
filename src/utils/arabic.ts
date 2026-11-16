import type { ArabicLetter, LetterForm } from '@/types'

const ZWJ = '‍'

/**
 * Harpyň söz içindäki görnüşini döredýär.
 * ZWJ (zero-width joiner) brauzere harpy goňşy harp bilen birleşdirilen ýaly çekmegi buýurýar.
 * Birleşmeýän harplaryň (ا د ذ ر ز و) başlangyç görnüşi ýeke görnüşi bilen,
 * orta görnüşi bolsa soňky görnüşi bilen deňdir.
 */
export function letterForm(char: string, form: LetterForm, nonConnecting = false): string {
  switch (form) {
    case 'isolated':
      return char
    case 'initial':
      return nonConnecting ? char : char + ZWJ
    case 'medial':
      return nonConnecting ? ZWJ + char : ZWJ + char + ZWJ
    case 'final':
      return ZWJ + char
  }
}

export const FORM_LABELS: Record<LetterForm, string> = {
  isolated: 'Ýeke',
  initial: 'Başda',
  medial: 'Ortada',
  final: 'Soňda',
}

/** Aýaty sözlere bölýär (Uthmani tekstinde söz arasy — boşluk) */
export function splitWords(text: string): string[] {
  return text.trim().split(/\s+/u).filter(Boolean)
}

const ARABIC_DIGITS = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩']

export function toArabicDigits(n: number): string {
  return String(n).replace(/\d/g, (d) => ARABIC_DIGITS[Number(d)]!)
}

/** Harpy hereket bilen birleşdirýär: بَ بِ بُ */
export const HARAKAT = {
  ustun: 'َ',
  astyn: 'ِ',
  otre: 'ُ',
  sukun: 'ْ',
} as const

/**
 * Uthmani ýazgysyndaky Kurana mahsus belgileri (waqf belgileri, kiçi harplar)
 * brauzeriň TTS-i üçin ýönekeýleşdirýär.
 */
export function toTtsText(text: string): string {
  return text
    .replace(/ٱ/g, 'ا') // ٱ → ا
    .replace(/ۡ/g, 'ْ') // Uthmani sukun → adaty sukun
    .replace(/[ۖ-ۜ۞-۠ۢ-ۭ]/g, '') // waqf we beýleki belgiler
    .replace(/ـ/g, '') // tatweel
}

export interface LetterSyllable {
  /** Ses faýlynyň ady: `<id>-a|i|u` (public/audio/letters/<key>.mp3) */
  key: string
  text: string
  translit: string
  name: string
}

/**
 * Harp üç hereket bilen: üstün, astyn, ötre.
 * Älif özbaşdak okalmaýar — hemze görnüşinde berilýär: أَ إِ أُ.
 * LetterDetailView we scripts/generate-tts-audio.mjs şu funksiýany ulanýar.
 */
export function letterSyllables(l: Pick<ArabicLetter, 'id' | 'char' | 'translit'>): LetterSyllable[] {
  const isAlif = l.id === 'alif'
  const variants = [
    { v: 'a', name: 'Üstün', mark: HARAKAT.ustun, carrier: isAlif ? 'أ' : l.char },
    { v: 'i', name: 'Astyn', mark: HARAKAT.astyn, carrier: isAlif ? 'إ' : l.char },
    { v: 'u', name: 'Ötre', mark: HARAKAT.otre, carrier: isAlif ? 'أ' : l.char },
  ]
  return variants.map((x) => ({
    key: `${l.id}-${x.v}`,
    text: x.carrier + x.mark,
    name: x.name,
    translit: isAlif ? x.v : l.translit + x.v,
  }))
}
