import { defineStore } from 'pinia'
import { computed } from 'vue'
import { usePersistentRef } from '@/services/storage'
import { LETTERS } from '@/data/letters'
import type { QuizResult } from '@/types'
import { useSettingsStore } from './settings'

export interface LetterStat {
  attempts: number
  mistakes: number
  lastMistakeAt?: number
}

export interface QuizHistoryItem {
  at: number
  total: number
  correct: number
}

export type LetterFilter = 'all' | 'unlearned' | 'learned' | 'review'

interface LettersState {
  /** “Öwrendim” bellik edilen harplar */
  learned: string[]
  /** Gaýtadan öwrenmeli harplar (ýalňyş analizinden ýa-da el bilen) */
  review: string[]
  stats: Record<string, LetterStat>
  history: QuizHistoryItem[]
  /** Soňky açylan harp — “galan ýerimden dowam” üçin */
  lastLetterId: string | null
}

const HISTORY_LIMIT = 30

export const useLettersStore = defineStore('letters', () => {
  const state = usePersistentRef<LettersState>('letters', {
    learned: [],
    review: [],
    stats: {},
    history: [],
    lastLetterId: null,
  })

  const learnedSet = computed(() => new Set(state.value.learned))
  const reviewSet = computed(() => new Set(state.value.review))

  const isLearned = (id: string) => learnedSet.value.has(id)
  const inReview = (id: string) => reviewSet.value.has(id)

  const progress = computed(() => ({
    learned: state.value.learned.length,
    total: LETTERS.length,
    percent: Math.round((state.value.learned.length / LETTERS.length) * 100),
  }))

  function filtered(filter: LetterFilter) {
    switch (filter) {
      case 'learned':
        return LETTERS.filter((l) => isLearned(l.id))
      case 'unlearned':
        return LETTERS.filter((l) => !isLearned(l.id))
      case 'review':
        return LETTERS.filter((l) => inReview(l.id))
      default:
        return LETTERS
    }
  }

  /** Ýalňyşlyk derejesi boýunça iň gowşak harplar */
  const weakLetters = computed(() =>
    LETTERS.map((l) => ({ letter: l, stat: state.value.stats[l.id] }))
      .filter((x) => x.stat && x.stat.mistakes > 0)
      .sort((a, b) => b.stat!.mistakes / b.stat!.attempts - a.stat!.mistakes / a.stat!.attempts)
      .map((x) => ({ ...x, stat: x.stat! })),
  )

  function markLearned(id: string) {
    if (!isLearned(id)) state.value.learned.push(id)
    state.value.review = state.value.review.filter((x) => x !== id)
  }

  function unmarkLearned(id: string) {
    state.value.learned = state.value.learned.filter((x) => x !== id)
  }

  function toggleLearned(id: string) {
    if (isLearned(id)) unmarkLearned(id)
    else markLearned(id)
  }

  /** Gaýtalama sanawyna goşmak “Öwrendim” belligini aýyrýar — harp täzeden öwrenilmeli */
  function addToReview(ids: string[]) {
    const set = new Set(state.value.review)
    ids.forEach((id) => {
      set.add(id)
      unmarkLearned(id)
    })
    state.value.review = LETTERS.map((l) => l.id).filter((id) => set.has(id))
  }

  function removeFromReview(id: string) {
    state.value.review = state.value.review.filter((x) => x !== id)
  }

  /** Quiz netijesini statistika ýazýar; sazlama açyk bolsa ýalňyşlary sanawa goşýar */
  function recordQuiz(result: QuizResult): string[] {
    const now = Date.now()
    for (const a of result.answers) {
      const s = (state.value.stats[a.tag] ??= { attempts: 0, mistakes: 0 })
      s.attempts++
      if (!a.correct) {
        s.mistakes++
        s.lastMistakeAt = now
      }
    }
    state.value.history = [
      { at: now, total: result.total, correct: result.correct },
      ...state.value.history,
    ].slice(0, HISTORY_LIMIT)

    const wrongIds = result.byTag.filter((t) => t.wrong > 0).map((t) => t.tag)
    if (useSettingsStore().settings.autoAddMistakes && wrongIds.length) addToReview(wrongIds)
    return wrongIds
  }

  function setLastLetter(id: string) {
    state.value.lastLetterId = id
  }

  return {
    state,
    progress,
    weakLetters,
    isLearned,
    inReview,
    filtered,
    markLearned,
    unmarkLearned,
    toggleLearned,
    addToReview,
    removeFromReview,
    recordQuiz,
    setLastLetter,
  }
})
