<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'
import AppIcon from './AppIcon.vue'
import RichText from './RichText.vue'

defineProps<{ title: string; subtitle?: string; eyebrow?: string; back?: RouteLocationRaw }>()
</script>

<template>
  <header class="mb-6 flex items-start gap-3">
    <RouterLink v-if="back" :to="back" class="btn-icon -ml-2 shrink-0" aria-label="Yza">
      <AppIcon name="chevron-left" :size="22" />
    </RouterLink>
    <div class="min-w-0 flex-1">
      <p v-if="eyebrow" class="eyebrow mb-1">{{ eyebrow }}</p>
      <h1 class="text-2xl leading-tight font-bold text-ink sm:text-3xl">{{ title }}</h1>
      <p v-if="subtitle" class="mt-1.5 text-[15px] text-muted"><RichText :text="subtitle" /></p>
    </div>
    <div class="flex shrink-0 items-center gap-2"><slot name="actions" /></div>
  </header>
</template>
