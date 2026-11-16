<script setup lang="ts">
import { computed } from 'vue'
import { audioUrls } from '@/config'
import { useAudio } from '@/services/audio'
import { useSettingsStore } from '@/stores/settings'
import type { Ayah } from '@/types'
import { splitWords, toArabicDigits, toTtsText } from '@/utils/arabic'

/**
 * Aýatyň arapça teksti. Her söz aýratyn düwme — basylanda şol sözüň
 * okalyşy ýaňlanýar (quran.com sözme-söz audio, bolmasa TTS).
 */
const props = defineProps<{ surahId: number; ayah: Ayah }>()

const audio = useAudio()
const settings = useSettingsStore()

const words = computed(() =>
  splitWords(props.ayah.arabic).map((text, i) => ({
    text,
    key: `w-${props.surahId}-${props.ayah.number}-${i + 1}`,
    request: { url: audioUrls.wordSources(props.surahId, props.ayah.number, i + 1), ttsText: toTtsText(text) },
  })),
)

function playWord(w: (typeof words.value)[number]) {
  audio.play(w.request, w.key, settings.settings.playbackRate)
}
</script>

<template>
  <p lang="ar" dir="rtl" class="quran-text text-center text-ink">
    <template v-for="w in words" :key="w.key">
      <button
        type="button"
        class="rounded-lg px-1 transition-colors hover:bg-gold-soft hover:text-primary focus-visible:bg-gold-soft"
        :class="audio.playingKey.value === w.key && 'bg-gold-soft text-primary'"
        :aria-label="`Sözi diňle: ${w.text}`"
        @click="playWord(w)"
      >
        {{ w.text }}
      </button>
      {{ ' ' }}
    </template>
    <span class="inline-block px-1 font-quran text-gold" aria-label="Aýatyň belgisi">
      ﴿{{ toArabicDigits(ayah.number) }}﴾
    </span>
  </p>
</template>
