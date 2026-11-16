<script setup lang="ts">
import AppIcon from '@/components/ui/AppIcon.vue'
import PageHeader from '@/components/ui/PageHeader.vue'
import ProgressBar from '@/components/ui/ProgressBar.vue'
import RichText from '@/components/ui/RichText.vue'
import { TAJWEED_RULES } from '@/data/tajweed'
import { useTajweedStore } from '@/stores/tajweed'

const store = useTajweedStore()

function statusOf(id: string) {
  const s = store.state.stats[id]
  if (store.weakRules.some((r) => r.id === id)) return { label: 'Bökdençlik bar', cls: 'bg-danger-soft text-danger' }
  if (store.isStudied(id)) return { label: 'Öwrenildi', cls: 'bg-success-soft text-success' }
  if (s) return { label: 'Başlanan', cls: 'bg-gold-soft text-gold' }
  return null
}
</script>

<template>
  <div>
    <PageHeader
      eyebrow="2-nji bölüm"
      title="Okalyş düzgünleri"
      subtitle="Hereketler, sukun, şedde, med we kalkala — mysallar we synaglar bilen."
    />

    <div class="card mb-6 grid gap-5 p-5 sm:grid-cols-[1fr_auto] sm:items-center sm:p-6">
      <div>
        <div class="mb-2 flex items-baseline justify-between">
          <p class="font-semibold text-ink">Öwrenilen düzgünler</p>
          <p class="text-sm text-muted">
            <span class="text-lg font-bold text-primary">{{ store.progress.studied }}</span> / {{ store.progress.total }}
          </p>
        </div>
        <ProgressBar :value="store.progress.percent" label="Öwrenilen düzgünler" />
        <p v-if="store.weakRules.length" class="mt-3 text-sm text-danger">
          Gaýtalamaly: {{ store.weakRules.map((r) => r.title).join(', ') }}
        </p>
      </div>
      <div class="flex flex-col gap-2 sm:w-60">
        <RouterLink :to="{ name: 'tajweed-quiz' }" class="btn-primary">
          <AppIcon name="quiz" /> Umumy synag
        </RouterLink>
        <RouterLink
          v-if="store.weakRules.length"
          :to="{ name: 'tajweed-quiz', query: { rules: store.weakRules.map((r) => r.id).join(',') } }"
          class="btn-secondary"
        >
          <AppIcon name="target" /> Gowşak düzgünler boýunça
        </RouterLink>
      </div>
    </div>

    <ol class="grid gap-3 md:grid-cols-2">
      <li v-for="r in TAJWEED_RULES" :key="r.id">
        <RouterLink
          :to="{ name: 'rule', params: { id: r.id } }"
          class="card group flex h-full items-center gap-4 p-4 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md sm:p-5"
        >
          <span
            lang="ar"
            class="flex h-16 w-20 shrink-0 items-center justify-center rounded-xl bg-primary-soft font-arabic text-3xl text-primary"
          >
            {{ r.examples[0]!.arabic }}
          </span>
          <span class="min-w-0 flex-1">
            <span class="flex flex-wrap items-center gap-2">
              <span class="text-xs font-bold text-muted">{{ r.order }}.</span>
              <span class="font-bold text-ink">{{ r.title }}</span>
              <span v-if="statusOf(r.id)" class="chip" :class="statusOf(r.id)!.cls">{{ statusOf(r.id)!.label }}</span>
            </span>
            <span class="mt-1 line-clamp-2 block text-sm text-muted"><RichText :text="r.summary" /></span>
          </span>
          <AppIcon name="chevron-right" class="text-muted transition-transform group-hover:translate-x-0.5" />
        </RouterLink>
      </li>
    </ol>
  </div>
</template>
