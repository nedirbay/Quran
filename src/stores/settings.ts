import { defineStore } from 'pinia'
import { watchEffect } from 'vue'
import { usePersistentRef } from '@/services/storage'
import { RECITERS } from '@/config'

export type Theme = 'light' | 'dark'

export interface Settings {
  theme: Theme
  /** Aýat tekstiniň ölçegi (px) */
  arabicFontSize: number
  /** Aýatyň aşagynda terjimäni görkezmek */
  showTranslation: boolean
  /** Harp kartlarynda transliterasiýa */
  showTranslit: boolean
  /** Quiz-de ýalňyşylan harplary awtomatiki gaýtalama sanawyna goşmak */
  autoAddMistakes: boolean
  /** Programma açylanda soňky sahypa dolanmak */
  resumeOnLaunch: boolean
  reciter: string
  /** Ses tizligi (0.75 = haýal) */
  playbackRate: number
}

const DEFAULTS: Settings = {
  theme: 'light',
  arabicFontSize: 40,
  showTranslation: true,
  showTranslit: true,
  autoAddMistakes: true,
  resumeOnLaunch: true,
  reciter: RECITERS[0]!.id,
  playbackRate: 1,
}

export const useSettingsStore = defineStore('settings', () => {
  const settings = usePersistentRef<Settings>('settings', { ...DEFAULTS })
  /** Soňky açylan sahypa (synaglardan başga) */
  const lastRoute = usePersistentRef<string | null>('last-route', null)

  watchEffect(() => {
    document.documentElement.classList.toggle('dark', settings.value.theme === 'dark')
    document.documentElement.style.setProperty('--quran-size', `${settings.value.arabicFontSize}px`)
  })

  function reset() {
    settings.value = { ...DEFAULTS }
  }

  return { settings, lastRoute, reset }
})
