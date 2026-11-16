<script setup lang="ts">
import AppIcon from '@/components/ui/AppIcon.vue'
import { useStoriesStore } from '@/stores/stories'

/** Gapdal panel: “Okadym” belligi we synag */
const props = defineProps<{ id: string; questionCount: number }>()
const store = useStoriesStore()
const stat = () => store.state.stats[props.id]
</script>

<template>
  <aside class="space-y-3 lg:sticky lg:top-24 lg:self-start">
    <button
      type="button"
      class="w-full"
      :class="store.isRead(id) ? 'btn border-2 border-primary/40 bg-primary-soft text-primary' : 'btn-gold'"
      :aria-pressed="store.isRead(id)"
      @click="store.toggleRead(id)"
    >
      <AppIcon :name="store.isRead(id) ? 'check' : 'bookmark'" />
      {{ store.isRead(id) ? 'Okaldy (belligi aýyr)' : 'Okadym — bellik et' }}
    </button>
    <div class="card p-5">
      <p class="eyebrow mb-2">Bilimiňi barla</p>
      <p class="mb-4 text-sm text-muted">{{ questionCount }} soragly gysga synag.</p>
      <RouterLink :to="{ name: 'history-quiz', query: { ids: id } }" class="btn-primary w-full">
        <AppIcon name="quiz" /> Synag tabşyr
      </RouterLink>
      <p v-if="stat()" class="mt-3 text-center text-xs text-muted">
        Öňki synaglarda: {{ stat()!.attempts - stat()!.mistakes }} / {{ stat()!.attempts }} dogry
      </p>
    </div>
    <slot />
  </aside>
</template>
