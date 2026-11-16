<script setup lang="ts">
import { SPONSOR } from '@/config'
import AppIcon from './AppIcon.vue'

/**
 * GitHub Sponsors düwmesi.
 * - `compact`: ýokarky panel üçin (mobilde diňe ikon)
 * - `card`: baş sahypa / sazlamalar üçin giňişleýin blok
 */
withDefaults(defineProps<{ variant?: 'compact' | 'card' }>(), { variant: 'compact' })
</script>

<template>
  <a
    v-if="variant === 'compact'"
    :href="SPONSOR.url"
    target="_blank"
    rel="noopener noreferrer"
    class="inline-flex h-10 items-center gap-2 rounded-xl border border-gold/40 px-3 text-sm font-semibold text-gold transition-colors hover:bg-gold-soft"
    aria-label="GitHub Sponsors arkaly taslamany goldaň (täze penjirede açylýar)"
  >
    <AppIcon name="heart" :size="18" />
    <span class="hidden sm:inline">Goldaw</span>
  </a>

  <div
    v-else
    class="card flex flex-col items-start gap-4 border-gold/40 p-5 sm:flex-row sm:items-center sm:p-6"
  >
    <span class="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-gold-soft text-gold">
      <AppIcon name="heart" :size="22" />
    </span>
    <div class="flex-1">
      <h2 class="font-bold text-ink">Taslamany goldaň</h2>
      <p class="mt-1 text-sm leading-relaxed text-muted">
        Bu programma mugt we açyk çeşmeli. Täze süreleri, ses ýazgylaryny we terjimeleri goşmaga kömek etmek
        isleseňiz, GitHub Sponsors arkaly goldap bilersiňiz.
      </p>
    </div>
    <a :href="SPONSOR.url" target="_blank" rel="noopener noreferrer" class="btn-gold w-full sm:w-auto">
      <AppIcon name="heart" :size="18" /> GitHub Sponsors
      <AppIcon name="external" :size="16" />
    </a>
  </div>
</template>
