<script setup lang="ts">
import AppIcon from '@/components/ui/AppIcon.vue'
import type { ArabicLetter } from '@/types'

defineProps<{ letter: ArabicLetter; learned: boolean; review: boolean; showTranslit: boolean }>()
</script>

<template>
  <RouterLink
    :to="{ name: 'letter', params: { id: letter.id } }"
    class="group relative flex flex-col items-center rounded-2xl border bg-surface px-2 pt-3 pb-3 transition-all hover:-translate-y-0.5 hover:shadow-md"
    :class="review ? 'border-danger/50' : learned ? 'border-primary/40' : 'border-line'"
  >
    <span class="absolute top-2 left-2.5 text-[11px] font-semibold text-muted/70">{{ letter.order }}</span>
    <span
      v-if="learned"
      class="absolute top-2 right-2 flex size-5 items-center justify-center rounded-full bg-primary text-on-primary"
      title="Öwrenildi"
    >
      <AppIcon name="check" :size="12" :stroke="3" />
    </span>
    <span
      v-else-if="review"
      class="absolute top-2 right-2 flex size-5 items-center justify-center rounded-full bg-danger text-white"
      title="Gaýtalamaly"
    >
      <AppIcon name="refresh" :size="11" :stroke="3" />
    </span>
    <span lang="ar" class="font-arabic text-5xl leading-[1.5] text-primary group-hover:text-primary-strong">
      {{ letter.char }}
    </span>
    <span class="text-sm font-bold text-ink">{{ letter.name }}</span>
    <span v-if="showTranslit" class="text-xs text-muted">{{ letter.translit }}</span>
  </RouterLink>
</template>
