<script setup lang="ts">
import { computed } from 'vue'
import AudioButton from '@/components/ui/AudioButton.vue'
import { audioUrls } from '@/config'
import ayahs from '@/data/history-ayahs.json'
import { SURAH_NAMES_TK } from '@/data/surahNames'
import { useSettingsStore } from '@/stores/settings'
import type { KeyAyah } from '@/types'
import { toArabicDigits, toTtsText } from '@/utils/arabic'

/** Esasy aýat: arapça tekst (çeşmeden), sesi we türkmençe manysy */
const props = defineProps<{ ayah: KeyAyah }>()
const settings = useSettingsStore()
const TEXTS = ayahs as Record<string, string>

const surah = computed(() => Number(props.ayah.ref.split(':')[0]))
const verses = computed(() => {
  const [start, end = start] = props.ayah.ref.split(':')[1]!.split('-').map(Number) as [number, number?]
  const list: { n: number; text: string }[] = []
  for (let n = start; n <= (end ?? start); n++) list.push({ n, text: TEXTS[`${surah.value}:${n}`] ?? '' })
  return list
})
const label = computed(() => `${SURAH_NAMES_TK[surah.value]} süresi, ${props.ayah.ref.replace('-', '–')}`)
</script>

<template>
  <figure class="card overflow-hidden">
    <div class="flex items-center justify-between gap-3 border-b border-line bg-primary-soft/60 px-5 py-3">
      <p class="eyebrow">Kurandan</p>
      <p class="text-xs font-semibold text-muted">{{ label }}</p>
    </div>
    <blockquote class="px-5 py-6 sm:px-8">
      <p lang="ar" dir="rtl" class="text-center font-quran text-[1.9rem] leading-[2.1] text-ink sm:text-[2.2rem]">
        <template v-for="v in verses" :key="v.n">
          {{ v.text }}
          <span class="text-gold">﴿{{ toArabicDigits(v.n) }}﴾</span>
          {{ ' ' }}
        </template>
      </p>
      <div class="ornament-divider my-4" aria-hidden="true"><span class="text-xs">۞</span></div>
      <figcaption class="text-center text-[17px] leading-relaxed text-ink/90">{{ ayah.turkmen }}</figcaption>
    </blockquote>
    <div class="flex flex-wrap justify-center gap-2 border-t border-line px-5 py-3">
      <AudioButton
        v-for="v in verses"
        :key="v.n"
        :audio-key="`key-${surah}-${v.n}`"
        :request="{ url: audioUrls.ayah(settings.settings.reciter, surah, v.n), ttsText: toTtsText(v.text) }"
        :label="verses.length > 1 ? `${v.n}-nji aýaty diňle` : 'Aýaty diňle'"
      />
    </div>
  </figure>
</template>
