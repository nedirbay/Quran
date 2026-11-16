<script setup lang="ts">
import RichText from '@/components/ui/RichText.vue'
import type { StorySection } from '@/types'

defineProps<{ sections: StorySection[] }>()
</script>

<template>
  <section v-for="(s, i) in sections" :key="s.title" class="card p-5 sm:p-6">
    <h2 class="mb-3 flex items-center gap-3 text-lg font-bold text-ink">
      <span class="flex size-7 items-center justify-center rounded-full bg-gold-soft text-sm text-gold">{{ i + 1 }}</span>
      {{ s.title }}
    </h2>
    <div class="space-y-3 text-[16px] leading-[1.75] text-ink/90">
      <p v-for="(p, j) in s.paragraphs" :key="j"><RichText :text="p" /></p>
    </div>
  </section>
</template>
