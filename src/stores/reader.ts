import { defineStore } from 'pinia'
import { computed } from 'vue'
import { usePersistentRef } from '@/services/storage'
import { SURAH_INDEX } from '@/services/quran'
import type { ReadingPosition } from '@/types'

interface ReaderState {
  last: ReadingPosition | null
  /** Süre belgisi → okalan aýatlaryň belgileri */
  read: Record<string, number[]>
  /** Okalan günler (YYYY-MM-DD) — yzygiderlilik üçin */
  days: string[]
}

/** Ýerli wagt boýunça şu günüň senesi (YYYY-MM-DD) */
const today = () => {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

export const useReaderStore = defineStore('reader', () => {
  const state = usePersistentRef<ReaderState>('reader', { last: null, read: {}, days: [] })

  const totalAyahs = SURAH_INDEX.reduce((n, s) => n + s.totalAyahs, 0)

  const totalRead = computed(() => Object.values(state.value.read).reduce((n, arr) => n + arr.length, 0))

  const progress = computed(() => ({
    read: totalRead.value,
    total: totalAyahs,
    percent: Math.round((totalRead.value / totalAyahs) * 100),
  }))

  function readAyahs(surahId: number): number[] {
    return state.value.read[surahId] ?? []
  }

  function isRead(surahId: number, ayah: number) {
    return readAyahs(surahId).includes(ayah)
  }

  function surahProgress(surahId: number) {
    const meta = SURAH_INDEX.find((s) => s.id === surahId)
    const read = readAyahs(surahId).length
    const total = meta?.totalAyahs ?? 0
    return { read, total, percent: total ? Math.round((read / total) * 100) : 0 }
  }

  function setPosition(surahId: number, ayah: number) {
    state.value.last = { surahId, ayah, updatedAt: Date.now() }
  }

  function markRead(surahId: number, ayah: number) {
    const list = state.value.read[surahId] ?? []
    if (!list.includes(ayah)) {
      state.value.read[surahId] = [...list, ayah].sort((a, b) => a - b)
    }
    const d = today()
    if (state.value.days[0] !== d) state.value.days = [d, ...state.value.days].slice(0, 365)
  }

  function unmarkRead(surahId: number, ayah: number) {
    state.value.read[surahId] = readAyahs(surahId).filter((a) => a !== ayah)
  }

  function resetSurah(surahId: number) {
    delete state.value.read[surahId]
  }

  return {
    state,
    progress,
    readAyahs,
    isRead,
    surahProgress,
    setPosition,
    markRead,
    unmarkRead,
    resetSurah,
  }
})
