import type {
  ArabicLetter,
  LetterForm,
  QuizAnswer,
  QuizQuestion,
  QuizResult,
  TajweedRule,
  TagReport,
} from '@/types'
import { audioUrls } from '@/config'
import { letterForm } from '@/utils/arabic'

/* ------------------------------------------------------------------
 * Quiz generatorlary — arassa funksiýalar (test edip bolýar)
 * ------------------------------------------------------------------ */

export type Rng = () => number

export function shuffle<T>(items: readonly T[], rng: Rng = Math.random): T[] {
  const a = [...items]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1))
    ;[a[i], a[j]] = [a[j]!, a[i]!]
  }
  return a
}

/**
 * Görnüşi meňzeş harplar — ýalňyş jogap (distraktor) hökmünde ilki şulary saýlaýarys,
 * şeýdip quiz hakyky tapawutlandyryş endigini barlaýar.
 */
const SIMILAR_GROUPS: string[][] = [
  ['ba', 'ta', 'tha', 'nun', 'ya'],
  ['jim', 'ha', 'kha'],
  ['dal', 'dhal', 'ra', 'zay'],
  ['sin', 'shin', 'sad', 'dad'],
  ['tta', 'zza'],
  ['ayn', 'ghayn'],
  ['fa', 'qaf'],
  ['kaf', 'lam'],
  ['haa', 'waw', 'mim'],
]

function similarIds(id: string): string[] {
  return SIMILAR_GROUPS.find((g) => g.includes(id))?.filter((x) => x !== id) ?? []
}

/** Dogry harp + 3 distraktor (meňzeşlerden başlap) */
function pickLetterOptions(target: ArabicLetter, all: ArabicLetter[], rng: Rng, n = 4): ArabicLetter[] {
  const byId = new Map(all.map((l) => [l.id, l]))
  const similar = shuffle(similarIds(target.id), rng)
    .map((id) => byId.get(id))
    .filter((l): l is ArabicLetter => !!l)
  const rest = shuffle(
    all.filter((l) => l.id !== target.id && !similar.includes(l)),
    rng,
  )
  // Meňzeşlerden iň köp 2 sany, galanlary tötänleýin
  const distractors = [...similar.slice(0, 2), ...rest].slice(0, n - 1)
  return shuffle([target, ...distractors], rng)
}

type LetterQuestionKind = 'glyph-to-name' | 'name-to-glyph' | 'sound-to-glyph' | 'form-to-letter'

const FORM_PROMPT: Record<Exclude<LetterForm, 'isolated'>, string> = {
  initial: 'sözüň başynda',
  medial: 'sözüň ortasynda',
  final: 'sözüň soňunda',
}

function buildLetterQuestion(
  target: ArabicLetter,
  kind: LetterQuestionKind,
  all: ArabicLetter[],
  index: number,
  rng: Rng,
): QuizQuestion {
  const opts = pickLetterOptions(target, all, rng)
  const id = `${index}-${target.id}-${kind}`
  const base = { id, tag: target.id, correctId: target.id }
  const hint = `${target.char} — ${target.name} (${target.translit})`

  switch (kind) {
    case 'glyph-to-name':
      return {
        ...base,
        prompt: 'Bu haýsy harp?',
        arabic: target.char,
        options: opts.map((l) => ({ id: l.id, label: l.name })),
        explanation: hint,
      }
    case 'name-to-glyph':
      return {
        ...base,
        prompt: `“${target.name}” harpyny tapyň`,
        options: opts.map((l) => ({ id: l.id, label: l.char, arabic: true })),
        explanation: hint,
      }
    case 'sound-to-glyph':
      return {
        ...base,
        prompt: 'Sesi diňläň we degişli harpy saýlaň',
        audio: { url: audioUrls.letter(target.id), ttsText: target.arabicName },
        options: opts.map((l) => ({ id: l.id, label: l.char, arabic: true })),
        explanation: hint,
      }
    case 'form-to-letter': {
      const forms = (target.nonConnecting ? ['final'] : ['initial', 'medial', 'final']) as Array<
        Exclude<LetterForm, 'isolated'>
      >
      const form = forms[Math.floor(rng() * forms.length)]!
      return {
        ...base,
        prompt: `Bu harp ${FORM_PROMPT[form]} ýazylan. Haýsy harp?`,
        arabic: letterForm(target.char, form, target.nonConnecting),
        options: opts.map((l) => ({ id: l.id, label: l.name, glyph: l.char })),
        explanation: hint,
      }
    }
  }
}

const LETTER_KINDS: LetterQuestionKind[] = ['glyph-to-name', 'name-to-glyph', 'sound-to-glyph', 'form-to-letter']

/**
 * Harplar boýunça quiz.
 * @param pool    Sorag beriljek harplar (saýlanan toplum)
 * @param all     Distraktorlar üçin ähli harplar
 * @param count   Sorag sany (pool kiçi bolsa harplar gaýtalanýar, ýöne başga görnüşde)
 */
export function buildLetterQuiz(
  pool: ArabicLetter[],
  all: ArabicLetter[],
  count: number,
  rng: Rng = Math.random,
): QuizQuestion[] {
  if (pool.length === 0) return []
  const questions: QuizQuestion[] = []
  let round = shuffle(pool, rng)
  for (let i = 0; i < count; i++) {
    if (i > 0 && i % pool.length === 0) round = shuffle(pool, rng)
    const target = round[i % pool.length]!
    const kind = LETTER_KINDS[Math.floor(rng() * LETTER_KINDS.length)]!
    questions.push(buildLetterQuestion(target, kind, all, i, rng))
  }
  return questions
}

/** Tejwid düzgünleri boýunça quiz — awtorlyk soraglaryndan, jogaplar garyşdyrylýar */
export function buildRuleQuiz(rules: TajweedRule[], rng: Rng = Math.random): QuizQuestion[] {
  const questions: QuizQuestion[] = []
  for (const rule of rules) {
    rule.questions.forEach((q, qi) => {
      const options = q.options.map((label, oi) => ({
        id: `${rule.id}-${qi}-${oi}`,
        label,
        arabic: q.arabicOptions,
      }))
      questions.push({
        id: `${rule.id}-${qi}`,
        tag: rule.id,
        prompt: q.prompt,
        arabic: q.arabic,
        options: shuffle(options, rng),
        correctId: options[q.answer]!.id,
        explanation: q.explanation ?? `Dogry jogap: ${q.options[q.answer]}`,
      })
    })
  }
  return shuffle(questions, rng)
}

/** Netijeleri hasaplaýar; `byTag` iň köp ýalňyşylanlardan başlap tertiplenýär */
export function scoreQuiz(answers: QuizAnswer[]): QuizResult {
  const map = new Map<string, TagReport>()
  for (const a of answers) {
    const r = map.get(a.tag) ?? { tag: a.tag, total: 0, wrong: 0 }
    r.total++
    if (!a.correct) r.wrong++
    map.set(a.tag, r)
  }
  const correct = answers.filter((a) => a.correct).length
  const total = answers.length
  return {
    total,
    correct,
    wrong: total - correct,
    percent: total ? Math.round((correct / total) * 100) : 0,
    byTag: [...map.values()].sort((a, b) => b.wrong - a.wrong || b.wrong / b.total - a.wrong / a.total),
    answers,
  }
}
