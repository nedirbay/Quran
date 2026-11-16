import type { IconName } from '@/components/ui/AppIcon.vue'

export interface NavItem {
  to: string
  label: string
  icon: IconName
  /** Işjeň hasaplanýan ýol prefiksi */
  match: string
}

export const NAV_ITEMS: NavItem[] = [
  { to: '/', label: 'Baş sahypa', icon: 'home', match: '/' },
  { to: '/harplar', label: 'Harplar', icon: 'letters', match: '/harplar' },
  { to: '/tejwid', label: 'Tejwid', icon: 'rules', match: '/tejwid' },
  { to: '/kuran', label: 'Kuran', icon: 'book', match: '/kuran' },
  { to: '/sazlamalar', label: 'Sazlamalar', icon: 'settings', match: '/sazlamalar' },
]
