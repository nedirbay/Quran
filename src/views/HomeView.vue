<script setup lang="ts">
import { computed } from 'vue'
import AppIcon, { type IconName } from '@/components/ui/AppIcon.vue'
import ProgressRing from '@/components/ui/ProgressRing.vue'
import SponsorButton from '@/components/ui/SponsorButton.vue'
import { getSurahMeta } from '@/services/quran'
import { useLettersStore } from '@/stores/letters'
import { useReaderStore } from '@/stores/reader'
import { useTajweedStore } from '@/stores/tajweed'

const letters = useLettersStore()
const tajweed = useTajweedStore()
const reader = useReaderStore()

const lastRead = computed(() => {
  const l = reader.state.last
  const meta = l && getSurahMeta(l.surahId)
  return l && meta ? { ...l, meta } : null
})

interface ModuleCard {
  step: string
  title: string
  text: string
  arabic: string
  icon: IconName
  to: string
  percent: number
  stat: string
}

const modules = computed<ModuleCard[]>(() => [
  {
    step: '1-nji bölüm',
    title: 'Harplar we elipbiý',
    text: '28 harpyň sesi, ýazylyş görnüşleri, bellik ulgamy we ýalňyş analizi bilen synag.',
    arabic: 'أ ب ت',
    icon: 'letters',
    to: '/harplar',
    percent: letters.progress.percent,
    stat: `${letters.progress.learned}/${letters.progress.total} harp`,
  },
  {
    step: '2-nji bölüm',
    title: 'Okalyş düzgünleri',
    text: 'Üstün, astyn, ötre, tenwin, sukun, şedde, med we kalkala — mysallar we hasabatly synag.',
    arabic: 'بَ بِ بُ',
    icon: 'rules',
    to: '/tejwid',
    percent: tajweed.progress.percent,
    stat: `${tajweed.progress.studied}/${tajweed.progress.total} düzgün`,
  },
  {
    step: '3-nji bölüm',
    title: 'Kurany okamak',
    text: 'Aýatlary arapça we türkmençe manysy bilen okaň, her sözüň okalyşyny diňläň.',
    arabic: 'ٱلۡحَمۡدُ لِلَّهِ',
    icon: 'book',
    to: '/kuran',
    percent: reader.progress.percent,
    stat: `${reader.progress.read}/${reader.progress.total} aýat`,
  },
])

const lastQuiz = computed(() => letters.state.history[0])
</script>

<template>
  <div class="space-y-8">
    <!-- Hoş geldiňiz -->
    <section class="relative overflow-hidden rounded-[1.75rem] bg-primary px-6 py-10 text-on-primary sm:px-10 sm:py-14">
      <div
        class="pointer-events-none absolute inset-0 opacity-[0.07]"
        style="
          background-image: radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0);
          background-size: 22px 22px;
        "
        aria-hidden="true"
      />
      <div class="relative grid items-center gap-8 md:grid-cols-[1fr_auto]">
        <div>
          <p class="eyebrow text-gold">Esselamu aleýkum</p>
          <h1 class="mt-3 text-3xl leading-tight font-bold sm:text-4xl">
            Kurany Kerimi okamagy<br class="hidden sm:block" />
            ädimme-ädim öwreniň
          </h1>
          <p class="mt-4 max-w-xl text-base opacity-85 sm:text-lg">
            Harplardan başlap, okalyş düzgünlerini öwrenip, aýatlary sesli sözlük bilen okaň. Ähli öňe gidişiňiz
            enjamyňyzda ýatda saklanýar.
          </p>
          <div class="mt-6 flex flex-wrap gap-3">
            <RouterLink
              v-if="lastRead"
              :to="{ name: 'reader', params: { surah: lastRead.surahId, ayah: lastRead.ayah } }"
              class="btn bg-gold text-white hover:brightness-110"
            >
              <AppIcon name="bookmark" /> Dowam et: {{ lastRead.meta.nameTurkmen }}, {{ lastRead.ayah }}-nji aýat
            </RouterLink>
            <RouterLink v-else to="/harplar" class="btn bg-gold text-white hover:brightness-110">
              <AppIcon name="play" /> Öwrenip başla
            </RouterLink>
          </div>
        </div>
        <p lang="ar" class="hidden text-center font-quran text-5xl leading-[1.8] text-gold md:block">
          بِسۡمِ ٱللَّهِ<br />ٱلرَّحۡمَٰنِ ٱلرَّحِيمِ
        </p>
      </div>
    </section>

    <!-- Gaýtalamaly harplar barada duýduryş -->
    <RouterLink
      v-if="letters.state.review.length"
      to="/harplar"
      class="flex items-center gap-4 rounded-2xl border border-danger/30 bg-danger-soft p-4 text-danger transition-colors hover:border-danger/60"
    >
      <AppIcon name="refresh" />
      <span class="flex-1 text-sm font-semibold">
        {{ letters.state.review.length }} harp gaýtadan öwrenmegiňize garaşýar
      </span>
      <span lang="ar" class="font-arabic text-2xl">
        {{ letters.filtered('review').slice(0, 5).map((l) => l.char).join(' ') }}
      </span>
      <AppIcon name="chevron-right" />
    </RouterLink>

    <!-- Modullar -->
    <section>
      <h2 class="mb-4 text-xl font-bold text-ink">Okuw bölümleri</h2>
      <div class="grid gap-4 md:grid-cols-3">
        <RouterLink
          v-for="m in modules"
          :key="m.to"
          :to="m.to"
          class="card group flex flex-col p-5 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg sm:p-6"
        >
          <div class="flex items-start justify-between">
            <span class="flex size-12 items-center justify-center rounded-2xl bg-primary-soft text-primary">
              <AppIcon :name="m.icon" :size="22" />
            </span>
            <ProgressRing :value="m.percent" :size="56" :stroke="5" />
          </div>
          <p class="eyebrow mt-5">{{ m.step }}</p>
          <h3 class="mt-1 text-lg font-bold text-ink">{{ m.title }}</h3>
          <p class="mt-2 flex-1 text-sm leading-relaxed text-muted">{{ m.text }}</p>
          <p lang="ar" dir="rtl" class="my-4 font-quran text-3xl text-primary/80">{{ m.arabic }}</p>
          <div class="flex items-center justify-between border-t border-line pt-4 text-sm">
            <span class="font-semibold text-muted">{{ m.stat }}</span>
            <span class="flex items-center gap-1 font-semibold text-primary">
              Aç <AppIcon name="arrow-right" :size="16" class="transition-transform group-hover:translate-x-1" />
            </span>
          </div>
        </RouterLink>
      </div>
    </section>

    <!-- Gysga statistika -->
    <section class="grid grid-cols-2 gap-3 sm:grid-cols-4">
      <div class="card p-4">
        <p class="text-xs text-muted">Öwrenilen harplar</p>
        <p class="mt-1 text-2xl font-bold text-ink">{{ letters.progress.learned }}</p>
      </div>
      <div class="card p-4">
        <p class="text-xs text-muted">Öwrenilen düzgünler</p>
        <p class="mt-1 text-2xl font-bold text-ink">{{ tajweed.progress.studied }}</p>
      </div>
      <div class="card p-4">
        <p class="text-xs text-muted">Okalan aýatlar</p>
        <p class="mt-1 text-2xl font-bold text-ink">{{ reader.progress.read }}</p>
      </div>
      <div class="card p-4">
        <p class="text-xs text-muted">Soňky harp synagy</p>
        <p class="mt-1 text-2xl font-bold text-ink">
          <template v-if="lastQuiz">{{ Math.round((lastQuiz.correct / lastQuiz.total) * 100) }}%</template>
          <template v-else>—</template>
        </p>
      </div>
    </section>

    <SponsorButton variant="card" />
  </div>
</template>
