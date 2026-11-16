import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

/**
 * Hash history — programma islendik statik hostingde (GitHub Pages, faýl ulgamy)
 * serwer sazlamasyz işleýär.
 * `meta.resumable` — programma täzeden açylanda şu sahypa dolanyp bolýar
 * (synag sahypalary dolanylmaýar, sebäbi olaryň ýagdaýy wagtlaýyn).
 */
const routes: RouteRecordRaw[] = [
  { path: '/', name: 'home', component: HomeView, meta: { title: 'Baş sahypa' } },

  // 1-nji bölüm: Harplar
  {
    path: '/harplar',
    name: 'letters',
    component: () => import('@/views/letters/LettersView.vue'),
    meta: { title: 'Harplar', resumable: true },
  },
  {
    path: '/harplar/synag',
    name: 'letters-quiz',
    component: () => import('@/views/letters/LettersQuizView.vue'),
    meta: { title: 'Harplar boýunça synag' },
  },
  {
    path: '/harplar/:id',
    name: 'letter',
    component: () => import('@/views/letters/LetterDetailView.vue'),
    props: true,
    meta: { title: 'Harp', resumable: true },
  },

  // 2-nji bölüm: Tejwid
  {
    path: '/tejwid',
    name: 'tajweed',
    component: () => import('@/views/tajweed/TajweedView.vue'),
    meta: { title: 'Okalyş düzgünleri', resumable: true },
  },
  {
    path: '/tejwid/synag',
    name: 'tajweed-quiz',
    component: () => import('@/views/tajweed/TajweedQuizView.vue'),
    meta: { title: 'Tejwid synagy' },
  },
  {
    path: '/tejwid/:id',
    name: 'rule',
    component: () => import('@/views/tajweed/TajweedRuleView.vue'),
    props: true,
    meta: { title: 'Düzgün', resumable: true },
  },

  // 3-nji bölüm: Kuran okamak
  {
    path: '/kuran',
    name: 'surahs',
    component: () => import('@/views/reader/SurahListView.vue'),
    meta: { title: 'Süreler', resumable: true },
  },
  {
    path: '/kuran/:surah/:ayah?',
    name: 'reader',
    component: () => import('@/views/reader/ReaderView.vue'),
    props: (r) => ({ surahId: Number(r.params.surah), ayah: r.params.ayah ? Number(r.params.ayah) : undefined }),
    meta: { title: 'Okamak', resumable: true },
  },

  {
    path: '/sazlamalar',
    name: 'settings',
    component: () => import('@/views/SettingsView.vue'),
    meta: { title: 'Sazlamalar' },
  },
  { path: '/:pathMatch(.*)*', redirect: '/' },
]

export const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior: (to, _from, saved) => saved ?? (to.hash ? { el: to.hash, behavior: 'smooth' } : { top: 0 }),
})

router.afterEach((to) => {
  const title = to.meta.title as string | undefined
  document.title = title ? `${title} · Kuran öwreniş` : 'Kuran öwreniş'
})

declare module 'vue-router' {
  interface RouteMeta {
    title?: string
    resumable?: boolean
  }
}
