<script setup lang="ts">
import { computed } from 'vue'
import { useAudio } from '@/services/audio'
import { useSettingsStore } from '@/stores/settings'
import type { AudioRequest } from '@/types'
import AppIcon from './AppIcon.vue'

const props = withDefaults(
  defineProps<{ audioKey: string; request: AudioRequest; label?: string; size?: 'sm' | 'md' | 'lg' }>(),
  { size: 'md' },
)

const audio = useAudio()
const settings = useSettingsStore()
const active = computed(() => audio.playingKey.value === props.audioKey)

function toggle() {
  audio.play(props.request, props.audioKey, settings.settings.playbackRate)
}
</script>

<template>
  <button
    type="button"
    class="inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors"
    :class="[
      active ? 'bg-gold text-white' : 'bg-primary-soft text-primary hover:bg-primary hover:text-on-primary',
      size === 'sm' && 'size-9',
      size === 'md' && (label ? 'h-11 px-4' : 'size-11'),
      size === 'lg' && (label ? 'h-14 px-6 text-base' : 'size-14'),
    ]"
    :aria-label="label ?? 'Diňle'"
    :aria-pressed="active"
    @click="toggle"
  >
    <AppIcon :name="active ? 'stop' : 'volume'" :size="size === 'lg' ? 24 : 18" />
    <span v-if="label">{{ label }}</span>
  </button>
</template>
