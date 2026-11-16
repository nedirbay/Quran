import { BOOK_BY_ID } from '@/data/books'
import { PROPHET_BY_ID } from '@/data/prophets'
import type { Prophet } from '@/types'

/** Pygamberiň adynyň yzyndan goýulýan hormat sözi */
export const honorific = (p: Pick<Prophet, 'id'>) => (p.id === 'muhammet' ? 'ﷺ' : '(a.s.)')

export const prophetDisplayName = (p: Prophet) => `${p.name} ${honorific(p)}`

/** Synag hasabaty üçin: id → ady / arapça ady */
export function storyLabel(id: string): string {
  const p = PROPHET_BY_ID[id]
  if (p) return prophetDisplayName(p)
  return BOOK_BY_ID[id]?.name ?? id
}

export function storyArabic(id: string): string | undefined {
  return PROPHET_BY_ID[id]?.arabicName ?? BOOK_BY_ID[id]?.arabicName
}

export function storyRoute(id: string) {
  return PROPHET_BY_ID[id]
    ? { name: 'prophet', params: { id } }
    : { name: 'book', params: { id } }
}
