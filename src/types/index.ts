/* ------------------------------------------------------------------
 * Domain types — ähli modullar üçin umumy tipler
 * ------------------------------------------------------------------ */

/** Arap elipbiýiniň bir harpy */
export interface ArabicLetter {
  /** Durnukly açar (URL we progress üçin), mysal: "ba" */
  id: string
  /** Elipbiýdäki tertip belgisi (1..28) */
  order: number
  /** Ýeke duran görnüşi */
  char: string
  /** Türkmençe ady: "Be" */
  name: string
  /** Arapça ady (TTS üçin hem ulanylýar): "بَاء" */
  arabicName: string
  /** Latyn transliterasiýasy: "b" */
  translit: string
  /** Okalyşy barada türkmençe düşündiriş (mahraj) */
  pronunciation: string
  /** Sagdaky harp bilen birleşmeýän harplar (ا د ذ ر ز و) */
  nonConnecting?: boolean
  /** Mysal söz */
  example: { arabic: string; translit: string; meaning: string }
}

export type LetterForm = 'isolated' | 'initial' | 'medial' | 'final'

/** Tejwid / okalyş düzgüni */
export interface TajweedRule {
  id: string
  order: number
  title: string
  arabicName: string
  /** Belgiň özi (görkezmek üçin), mysal: "ـَ" */
  symbol: string
  summary: string
  /** Giňişleýin düşündiriş paragraflary */
  explanation: string[]
  examples: TajweedExample[]
  /** Ýatda saklamak üçin gysga maslahat */
  tip?: string
  questions: AuthoredQuestion[]
}

export interface TajweedExample {
  arabic: string
  translit: string
  note?: string
}

/** El bilen ýazylan sorag (tejwid moduly üçin) */
export interface AuthoredQuestion {
  prompt: string
  arabic?: string
  options: string[]
  /** Jogaplar arapça tekst bolsa — uly arap şriftinde görkezilýär */
  arabicOptions?: boolean
  /** `options` içindäki dogry jogabyň indeksi */
  answer: number
  explanation?: string
}

/* ----------------------------- Quiz -------------------------------- */

export interface QuizOption {
  id: string
  label: string
  /** Arapça tekst bolsa — uly arap şriftinde görkezilýär */
  arabic?: boolean
  /** Ýazgynyň ýanynda görkeziljek arap harpy (mysal: harpyň ady + harpy) */
  glyph?: string
}

export interface QuizQuestion {
  id: string
  /** Haýsy harp / düzgün barada (ýalňyş analizi üçin) */
  tag: string
  prompt: string
  /** Soragda görkeziljek uly arapça tekst */
  arabic?: string
  /** Soragda sesli bölek bar bolsa */
  audio?: AudioRequest
  options: QuizOption[]
  correctId: string
  explanation?: string
}

export interface QuizAnswer {
  questionId: string
  tag: string
  chosenId: string
  correct: boolean
}

export interface TagReport {
  tag: string
  total: number
  wrong: number
}

export interface QuizResult {
  total: number
  correct: number
  wrong: number
  /** 0..100 */
  percent: number
  byTag: TagReport[]
  answers: QuizAnswer[]
}

/* ----------------------------- Audio ------------------------------- */

export interface AudioRequest {
  /** Faýl(lar): birnäçe bolsa tertip boýunça synanyşylýar (ýerli → onlaýn) */
  url?: string | string[]
  /** Faýl ýok bolsa brauzeriň TTS-i arkaly okaljak arapça tekst */
  ttsText?: string
}

/* ----------------------------- Quran ------------------------------- */

export interface SurahMeta {
  id: number
  nameArabic: string
  nameTranslit: string
  nameTurkmen: string
  revelation: 'mekke' | 'medine'
  totalAyahs: number
}

export interface Ayah {
  /** Süre içindäki belgisi */
  number: number
  arabic: string
  turkmen: string
}

export interface Surah extends SurahMeta {
  ayahs: Ayah[]
}

export interface ReadingPosition {
  surahId: number
  ayah: number
  updatedAt: number
}

/* ---------------------- Kitaplar we pygamberler ----------------------- */

/** Kuran salgysy: süre + aýat(lar), mysal: { surah: 21, ayahs: '51–70' } */
export interface QuranRef {
  surah: number
  ayahs: string
  note?: string
}

/** Esasy aýat: arapça tekst `history-ayahs.json`-dan alynýar */
export interface KeyAyah {
  /** "21:69" ýa-da "20:25-28" */
  ref: string
  turkmen: string
}

export interface StorySection {
  title: string
  paragraphs: string[]
}

export interface ScriptureBook {
  id: string
  order: number
  name: string
  arabicName: string
  /** Inderilen pygamber(ler)iň id-leri */
  prophetIds: string[]
  language: string
  period: string
  summary: string
  sections: StorySection[]
  keyAyah: KeyAyah
  refs: QuranRef[]
  questions: AuthoredQuestion[]
}

export interface Prophet {
  id: string
  /** Takmynan taryhy tertip */
  order: number
  name: string
  arabicName: string
  title: string
  sentTo: string
  period?: string
  /** Garyndaşlyk gatnaşyklary */
  family?: string
  /** Ulul-azm (iň uly kararly) pygamberlerden */
  ululAzm?: boolean
  bookId?: string
  summary: string
  sections: StorySection[]
  lessons: string[]
  keyAyah: KeyAyah
  refs: QuranRef[]
  questions: AuthoredQuestion[]
}
