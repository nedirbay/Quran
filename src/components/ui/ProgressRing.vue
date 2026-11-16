<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{ value: number; size?: number; stroke?: number }>(), {
  size: 64,
  stroke: 6,
})
const r = computed(() => (props.size - props.stroke) / 2)
const c = computed(() => 2 * Math.PI * r.value)
const offset = computed(() => c.value * (1 - Math.min(100, Math.max(0, props.value)) / 100))
</script>

<template>
  <div class="relative inline-flex items-center justify-center" :style="{ width: `${size}px`, height: `${size}px` }">
    <svg :width="size" :height="size" class="-rotate-90">
      <circle :cx="size / 2" :cy="size / 2" :r="r" fill="none" :stroke-width="stroke" class="stroke-surface-2" />
      <circle
        :cx="size / 2"
        :cy="size / 2"
        :r="r"
        fill="none"
        :stroke-width="stroke"
        stroke-linecap="round"
        class="stroke-gold transition-[stroke-dashoffset] duration-700"
        :stroke-dasharray="c"
        :stroke-dashoffset="offset"
      />
    </svg>
    <span class="absolute text-sm font-bold text-ink"><slot>{{ Math.round(value) }}%</slot></span>
  </div>
</template>
