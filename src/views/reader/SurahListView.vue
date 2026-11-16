<script setup lang="ts">
import { computed } from 'vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import PageHeader from '@/components/ui/PageHeader.vue'
import ProgressBar from '@/components/ui/ProgressBar.vue'
import ProgressRing from '@/components/ui/ProgressRing.vue'
import { getSurahMeta, SURAH_INDEX } from '@/services/quran'
import { useReaderStore } from '@/stores/reader'

const reader = useReaderStore()
const last = computed(() => {
  const l = reader.state.last
  if (!l) return null
  const meta = getSurahMeta(l.surahId)
  return meta ? { ...l, meta } : null
})
</script>

<template>
  <div>
    <PageHeader
      eyebrow="3-nji bölüm"
      title="Kurany Kerim okamak"
      subtitle="Aýatlary arapça okaň, sözleriň okalyşyny diňläň we manysy bilen tanyşyň."
    />

    <div class="mb-6 grid gap-4 md:grid-cols-[1fr_auto]">
      <!-- Galan ýerimden dowam et -->
      <RouterLink
        v-if="last"
        :to="{ name: 'reader', params: { surah: last.surahId, ayah: last.ayah } }"
        class="group relative flex items-center gap-4 overflow-hidden rounded-(--radius-card) bg-primary p-5 text-on-primary sm:p-6"
      >
        <span class="pointer-events-none absolute -top-6 -left-4 font-quran text-[8rem] leading-none text-white/5" aria-hidden="true">۞</span>
        <span class="flex size-12 shrink-0 items-center justify-center rounded-full bg-white/10">
          <AppIcon name="bookmark" />
        </span>
        <span class="flex-1">
          <span class="block text-sm opacity-80">Galan ýeriňizden dowam ediň</span>
          <span class="block text-lg font-bold">{{ last.meta.nameTurkmen }} süresi, {{ last.ayah }}-nji aýat</span>
        </span>
        <span lang="ar" class="hidden font-quran text-3xl text-gold sm:block">{{ last.meta.nameArabic }}</span>
        <AppIcon name="arrow-right" class="transition-transform group-hover:translate-x-1" />
      </RouterLink>

      <div class="card flex items-center gap-4 p-5" :class="!last && 'md:col-span-2'">
        <ProgressRing :value="reader.progress.percent" :size="60" />
        <div>
          <p class="text-sm text-muted">Jemi okalan aýatlar</p>
          <p class="text-lg font-bold text-ink">{{ reader.progress.read }} / {{ reader.progress.total }}</p>
          <p class="text-xs text-muted">{{ reader.state.days.length }} gün okaldy</p>
        </div>
      </div>
    </div>

    <ul class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      <li v-for="s in SURAH_INDEX" :key="s.id">
        <RouterLink
          :to="{ name: 'reader', params: { surah: s.id } }"
          class="card group flex items-center gap-4 p-4 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
        >
          <span
            class="flex size-11 shrink-0 rotate-45 items-center justify-center rounded-lg border-2 text-sm font-bold"
            :class="reader.surahProgress(s.id).percent === 100 ? 'border-primary bg-primary text-on-primary' : 'border-gold/60 text-gold'"
          >
            <span class="-rotate-45">{{ s.id }}</span>
          </span>
          <span class="min-w-0 flex-1">
            <span class="flex items-baseline justify-between gap-2">
              <span class="truncate font-bold text-ink">{{ s.nameTurkmen }}</span>
              <span lang="ar" class="font-quran text-xl text-primary">{{ s.nameArabic }}</span>
            </span>
            <span class="text-xs text-muted">
              {{ s.revelation === 'mekke' ? 'Mekke' : 'Medine' }} · {{ s.totalAyahs }} aýat
            </span>
            <ProgressBar class="mt-2" :value="reader.surahProgress(s.id).percent" />
          </span>
        </RouterLink>
      </li>
    </ul>

    <p class="mt-8 text-center text-xs leading-relaxed text-muted">
      Arapça tekst: Uthmani ýazgysy (The Noble Qur'an Encyclopedia, CC BY-SA 4.0).<br />
      Türkmençe many — düşünmek üçin gysga terjime; resmi tefsir däldir.
    </p>
  </div>
</template>
