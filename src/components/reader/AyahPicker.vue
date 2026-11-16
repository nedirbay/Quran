<script setup lang="ts">
import { useReaderStore } from '@/stores/reader'

defineProps<{ surahId: number; total: number; current: number }>()
const emit = defineEmits<{ select: [ayah: number] }>()
const reader = useReaderStore()
</script>

<template>
  <div>
    <div class="mb-3 flex items-center gap-4 text-xs text-muted">
      <span class="flex items-center gap-1.5"><span class="size-3 rounded bg-primary" /> Okalan</span>
      <span class="flex items-center gap-1.5"><span class="size-3 rounded ring-2 ring-gold" /> Häzirki</span>
    </div>
    <div class="grid grid-cols-6 gap-2 sm:grid-cols-10">
      <button
        v-for="n in total"
        :key="n"
        type="button"
        class="flex h-11 items-center justify-center rounded-lg text-sm font-semibold transition-colors"
        :class="[
          reader.isRead(surahId, n) ? 'bg-primary text-on-primary' : 'bg-surface-2 text-ink hover:bg-primary-soft',
          n === current && 'ring-2 ring-gold ring-offset-2 ring-offset-surface',
        ]"
        :aria-current="n === current ? 'true' : undefined"
        @click="emit('select', n)"
      >
        {{ n }}
      </button>
    </div>
  </div>
</template>
