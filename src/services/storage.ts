import { ref, watch, type Ref } from 'vue'
import { STORAGE_PREFIX } from '@/config'

/**
 * LocalStorage üçin howpsuz örtük.
 * - Ähli açarlar wersiýaly prefiks bilen saklanýar (maglumat gurluşy üýtgände migrasiýa üçin).
 * - JSON ýalňyşlyklary we doly ammar (quota) ýagdaýlary programmany döwmeýär.
 */
export const storage = {
  load<T>(key: string, fallback: T): T {
    try {
      const raw = localStorage.getItem(STORAGE_PREFIX + key)
      if (raw == null) return fallback
      const parsed = JSON.parse(raw) as T
      // Täze meýdanlar goşulanda köne maglumat bilen birleşdirýäris
      if (isPlainObject(fallback) && isPlainObject(parsed)) {
        return { ...fallback, ...parsed }
      }
      return parsed
    } catch {
      return fallback
    }
  },

  save<T>(key: string, value: T): void {
    try {
      localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value))
    } catch (err) {
      console.warn('[storage] ýazyp bolmady:', key, err)
    }
  },

  remove(key: string): void {
    localStorage.removeItem(STORAGE_PREFIX + key)
  },

  /** Programmanyň ähli maglumatlary (eksport üçin) */
  exportAll(): Record<string, unknown> {
    const out: Record<string, unknown> = {}
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i)
      if (!k?.startsWith(STORAGE_PREFIX)) continue
      try {
        out[k.slice(STORAGE_PREFIX.length)] = JSON.parse(localStorage.getItem(k) ?? 'null')
      } catch {
        /* zaýalanan ýazgyny geçýäris */
      }
    }
    return out
  },

  importAll(data: Record<string, unknown>): void {
    for (const [k, v] of Object.entries(data)) this.save(k, v)
  },

  clearAll(): void {
    const keys: string[] = []
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i)
      if (k?.startsWith(STORAGE_PREFIX)) keys.push(k)
    }
    keys.forEach((k) => localStorage.removeItem(k))
  },
}

function isPlainObject(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null && !Array.isArray(v)
}

/** LocalStorage bilen awtomatiki sinhronlaşýan reaktiw ref */
export function usePersistentRef<T>(key: string, fallback: T): Ref<T> {
  const state = ref(storage.load(key, fallback)) as Ref<T>
  watch(state, (v) => storage.save(key, v), { deep: true })
  return state
}
