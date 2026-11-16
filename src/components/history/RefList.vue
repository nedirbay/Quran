<script setup lang="ts">
import AppIcon from '@/components/ui/AppIcon.vue'
import { SURAH_NAMES_TK } from '@/data/surahNames'
import { getSurahMeta } from '@/services/quran'
import type { QuranRef } from '@/types'

/** Kuran salgylary; süre programmada bar bolsa — okaýja salgy */
defineProps<{ refs: QuranRef[] }>()
const firstAyah = (r: QuranRef) => Number(r.ayahs.match(/\d+/)![0])
</script>

<template>
  <section class="card p-5 sm:p-6">
    <h2 class="mb-1 text-lg font-bold text-ink">Kuranda okaň</h2>
    <p class="mb-4 text-sm text-muted">Bu wakalar Kurany Kerimiň şu aýatlarynda beýan edilýär.</p>
    <ul class="divide-y divide-line">
      <li v-for="r in refs" :key="`${r.surah}:${r.ayahs}`" class="flex items-center gap-3 py-2.5">
        <span class="flex size-9 shrink-0 items-center justify-center rounded-lg bg-surface-2 text-xs font-bold text-muted">
          {{ r.surah }}
        </span>
        <span class="min-w-0 flex-1">
          <span class="font-semibold text-ink">{{ SURAH_NAMES_TK[r.surah] }} süresi</span>
          <span class="text-muted"> · {{ r.surah }}:{{ r.ayahs }}</span>
          <span v-if="r.note" class="block text-xs text-muted">{{ r.note }}</span>
        </span>
        <RouterLink
          v-if="getSurahMeta(r.surah)"
          :to="{ name: 'reader', params: { surah: r.surah, ayah: firstAyah(r) } }"
          class="btn-ghost min-h-9 px-3 text-sm"
        >
          Oka <AppIcon name="chevron-right" :size="14" />
        </RouterLink>
      </li>
    </ul>
  </section>
</template>
