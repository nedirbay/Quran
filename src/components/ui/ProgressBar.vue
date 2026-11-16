<script setup lang="ts">
withDefaults(defineProps<{ value: number; tone?: 'primary' | 'gold' | 'danger'; label?: string }>(), {
  tone: 'primary',
})
</script>

<template>
  <div
    class="h-2 w-full overflow-hidden rounded-full bg-surface-2"
    role="progressbar"
    :aria-valuenow="value"
    aria-valuemin="0"
    aria-valuemax="100"
    :aria-label="label"
  >
    <div
      class="h-full rounded-full transition-[width] duration-500"
      :class="{ 'bg-primary': tone === 'primary', 'bg-gold': tone === 'gold', 'bg-danger': tone === 'danger' }"
      :style="{ width: `${Math.min(100, Math.max(0, value))}%` }"
    />
  </div>
</template>
