import { describe, expect, it } from 'vitest'
import { LETTERS } from '@/data/letters'
import { TAJWEED_RULES } from '@/data/tajweed'
import { buildLetterQuiz, buildRuleQuiz, scoreQuiz, shuffle } from './quiz'

/** Deterministik RNG — testler gaýtalanýar */
function seeded(seed = 42) {
  let s = seed
  return () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646
}

describe('shuffle', () => {
  it('elementleri ýitirmeýär we asyl massiwi üýtgetmeýär', () => {
    const src = [1, 2, 3, 4, 5]
    const out = shuffle(src, seeded())
    expect(out.sort()).toEqual([1, 2, 3, 4, 5])
    expect(src).toEqual([1, 2, 3, 4, 5])
  })
})

describe('buildLetterQuiz', () => {
  it('soralan sanda sorag döredýär, her soragda 4 dürli jogap we dogry jogap bar', () => {
    const qs = buildLetterQuiz(LETTERS, LETTERS, 30, seeded())
    expect(qs).toHaveLength(30)
    for (const q of qs) {
      expect(q.options).toHaveLength(4)
      expect(new Set(q.options.map((o) => o.id)).size).toBe(4)
      expect(q.options.some((o) => o.id === q.correctId)).toBe(true)
      expect(q.tag).toBe(q.correctId)
    }
  })

  it('diňe saýlanan toplumdan sorag berýär', () => {
    const pool = LETTERS.slice(0, 3)
    const qs = buildLetterQuiz(pool, LETTERS, 12, seeded(7))
    expect(new Set(qs.map((q) => q.tag))).toEqual(new Set(pool.map((l) => l.id)))
  })

  it('boş toplumda boş sanaw gaýtarýar', () => {
    expect(buildLetterQuiz([], LETTERS, 10)).toEqual([])
  })
})

describe('buildRuleQuiz', () => {
  it('her düzgüniň ähli soraglaryny goşýar we dogry jogaby saklaýar', () => {
    const qs = buildRuleQuiz(TAJWEED_RULES, seeded())
    const expected = TAJWEED_RULES.reduce((n, r) => n + r.questions.length, 0)
    expect(qs).toHaveLength(expected)
    for (const q of qs) {
      const rule = TAJWEED_RULES.find((r) => r.id === q.tag)!
      const authored = rule.questions[Number(q.id.split('-').at(-1))]!
      const correct = q.options.find((o) => o.id === q.correctId)!
      expect(correct.label).toBe(authored.options[authored.answer])
    }
  })
})

describe('scoreQuiz', () => {
  it('umumy we bölümleýin netijäni hasaplaýar, iň köp ýalňyşlary öňe çykarýar', () => {
    const r = scoreQuiz([
      { questionId: '1', tag: 'ba', chosenId: 'x', correct: false },
      { questionId: '2', tag: 'ba', chosenId: 'x', correct: false },
      { questionId: '3', tag: 'ta', chosenId: 'ta', correct: true },
      { questionId: '4', tag: 'jim', chosenId: 'x', correct: false },
    ])
    expect(r).toMatchObject({ total: 4, correct: 1, wrong: 3, percent: 25 })
    expect(r.byTag[0]).toEqual({ tag: 'ba', total: 2, wrong: 2 })
    expect(r.byTag.at(-1)!.tag).toBe('ta')
  })
})

describe('maglumatlaryň bitewiligi', () => {
  it('28 harp, açarlar gaýtalanmaýar', () => {
    expect(LETTERS).toHaveLength(28)
    expect(new Set(LETTERS.map((l) => l.id)).size).toBe(28)
    LETTERS.forEach((l, i) => expect(l.order).toBe(i + 1))
  })

  it('tejwid soraglarynda dogry jogabyň indeksi çäkde', () => {
    for (const r of TAJWEED_RULES)
      for (const q of r.questions) {
        expect(q.answer).toBeGreaterThanOrEqual(0)
        expect(q.answer).toBeLessThan(q.options.length)
        expect(new Set(q.options).size).toBe(q.options.length)
      }
  })
})
