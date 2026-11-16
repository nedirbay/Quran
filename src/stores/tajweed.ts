import { defineStore } from 'pinia'
import { computed } from 'vue'
import { usePersistentRef } from '@/services/storage'
import { TAJWEED_RULES } from '@/data/tajweed'
import type { QuizResult, TagReport } from '@/types'

export interface RuleStat {
  attempts: number
  mistakes: number
  /** Iň soňky quiz-däki netije (0..100) */
  lastPercent?: number
}

export interface RuleQuizHistoryItem {
  at: number
  rules: string[]
  total: number
  correct: number
  byTag: TagReport[]
}

interface TajweedState {
  studied: string[]
  stats: Record<string, RuleStat>
  history: RuleQuizHistoryItem[]
  lastRuleId: string | null
}

export const useTajweedStore = defineStore('tajweed', () => {
  const state = usePersistentRef<TajweedState>('tajweed', {
    studied: [],
    stats: {},
    history: [],
    lastRuleId: null,
  })

  const isStudied = (id: string) => state.value.studied.includes(id)

  const progress = computed(() => ({
    studied: state.value.studied.length,
    total: TAJWEED_RULES.length,
    percent: Math.round((state.value.studied.length / TAJWEED_RULES.length) * 100),
  }))

  /** Bökdençlik bar düzgünler: umumy ýalňyşlyk derejesi ≥ 25% */
  const weakRules = computed(() =>
    TAJWEED_RULES.filter((r) => {
      const s = state.value.stats[r.id]
      return s && s.attempts > 0 && s.mistakes / s.attempts >= 0.25
    }),
  )

  function toggleStudied(id: string) {
    state.value.studied = isStudied(id)
      ? state.value.studied.filter((x) => x !== id)
      : [...state.value.studied, id]
  }

  function recordQuiz(result: QuizResult, rules: string[]) {
    for (const t of result.byTag) {
      const s = (state.value.stats[t.tag] ??= { attempts: 0, mistakes: 0 })
      s.attempts += t.total
      s.mistakes += t.wrong
      s.lastPercent = Math.round(((t.total - t.wrong) / t.total) * 100)
      // Ýalňyşsyz geçilen düzgün öwrenilen hasaplanýar
      if (t.wrong === 0 && !isStudied(t.tag)) state.value.studied.push(t.tag)
    }
    state.value.history = [
      { at: Date.now(), rules, total: result.total, correct: result.correct, byTag: result.byTag },
      ...state.value.history,
    ].slice(0, 30)
  }

  function setLastRule(id: string) {
    state.value.lastRuleId = id
  }

  return { state, progress, weakRules, isStudied, toggleStudied, recordQuiz, setLastRule }
})
