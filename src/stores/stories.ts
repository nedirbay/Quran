import { defineStore } from 'pinia'
import { computed } from 'vue'
import { BOOKS } from '@/data/books'
import { PROPHETS } from '@/data/prophets'
import { usePersistentRef } from '@/services/storage'
import type { QuizResult } from '@/types'

/** Kitaplar we pygamberler bölümi: okalanlar, synag statistikasy */
interface StoriesState {
  /** “Okadym” bellenen kitap/pygamber id-leri */
  read: string[]
  stats: Record<string, { attempts: number; mistakes: number }>
  history: { at: number; total: number; correct: number }[]
  lastId: string | null
}

const TOTAL = BOOKS.length + PROPHETS.length

export const useStoriesStore = defineStore('stories', () => {
  const state = usePersistentRef<StoriesState>('stories', { read: [], stats: {}, history: [], lastId: null })

  const isRead = (id: string) => state.value.read.includes(id)

  const progress = computed(() => ({
    read: state.value.read.length,
    total: TOTAL,
    percent: Math.round((state.value.read.length / TOTAL) * 100),
    books: BOOKS.filter((b) => isRead(b.id)).length,
    prophets: PROPHETS.filter((p) => isRead(p.id)).length,
  }))

  /** Synaglarda ýalňyşlyk derejesi ≥ 34% bolanlar */
  const weakIds = computed(() =>
    Object.entries(state.value.stats)
      .filter(([, s]) => s.attempts > 0 && s.mistakes / s.attempts >= 0.34)
      .map(([id]) => id),
  )

  function toggleRead(id: string) {
    state.value.read = isRead(id) ? state.value.read.filter((x) => x !== id) : [...state.value.read, id]
  }

  function recordQuiz(result: QuizResult) {
    for (const t of result.byTag) {
      const s = (state.value.stats[t.tag] ??= { attempts: 0, mistakes: 0 })
      s.attempts += t.total
      s.mistakes += t.wrong
    }
    state.value.history = [
      { at: Date.now(), total: result.total, correct: result.correct },
      ...state.value.history,
    ].slice(0, 30)
  }

  function setLast(id: string) {
    state.value.lastId = id
  }

  return { state, progress, weakIds, isRead, toggleRead, recordQuiz, setLast }
})
