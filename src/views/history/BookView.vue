<script setup lang="ts">
import { computed, watchEffect } from 'vue'
import KeyAyahCard from '@/components/history/KeyAyahCard.vue'
import RefList from '@/components/history/RefList.vue'
import StoryAside from '@/components/history/StoryAside.vue'
import StorySections from '@/components/history/StorySections.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import PageHeader from '@/components/ui/PageHeader.vue'
import RichText from '@/components/ui/RichText.vue'
import { BOOK_BY_ID, BOOKS } from '@/data/books'
import { PROPHET_BY_ID } from '@/data/prophets'
import { useStoriesStore } from '@/stores/stories'
import { honorific } from '@/utils/history'

const props = defineProps<{ id: string }>()
const store = useStoriesStore()

const b = computed(() => BOOK_BY_ID[props.id])
const prev = computed(() => (b.value ? BOOKS[b.value.order - 2] : undefined))
const next = computed(() => (b.value ? BOOKS[b.value.order] : undefined))
const prophets = computed(() => (b.value?.prophetIds ?? []).map((id) => PROPHET_BY_ID[id]!))

watchEffect(() => {
  if (b.value) store.setLast(b.value.id)
})
</script>

<template>
  <div v-if="b">
    <PageHeader
      :eyebrow="`${b.order}-nji kitap · ${BOOKS.length}-den`"
      :title="b.name"
      :back="{ name: 'history', query: { tab: 'books' } }"
    />

    <div class="grid gap-5 lg:grid-cols-[minmax(0,1fr)_18rem]">
      <div class="min-w-0 space-y-5">
        <section class="card overflow-hidden">
          <div class="flex flex-col items-center gap-5 bg-primary px-6 py-8 text-on-primary sm:flex-row sm:px-8">
            <p lang="ar" class="text-center font-quran text-6xl leading-[1.7] text-gold">{{ b.arabicName }}</p>
            <p class="flex-1 text-center text-[17px] leading-relaxed opacity-95 sm:text-left"><RichText :text="b.summary" /></p>
          </div>
          <dl class="grid gap-px bg-line sm:grid-cols-3">
            <div class="bg-surface px-5 py-3.5">
              <dt class="text-xs font-semibold text-muted">Inderilen pygamber</dt>
              <dd class="mt-0.5 flex flex-wrap gap-x-2">
                <RouterLink
                  v-for="p in prophets"
                  :key="p.id"
                  :to="{ name: 'prophet', params: { id: p.id } }"
                  class="text-sm font-semibold text-primary underline"
                >
                  <RichText :text="`${p.name} ${honorific(p)}`" />
                </RouterLink>
              </dd>
            </div>
            <div class="bg-surface px-5 py-3.5">
              <dt class="text-xs font-semibold text-muted">Dili</dt>
              <dd class="mt-0.5 text-sm font-semibold text-ink">{{ b.language }}</dd>
            </div>
            <div class="bg-surface px-5 py-3.5">
              <dt class="text-xs font-semibold text-muted">Döwri</dt>
              <dd class="mt-0.5 text-sm font-semibold text-ink">{{ b.period }}</dd>
            </div>
          </dl>
        </section>

        <StorySections :sections="b.sections" />
        <KeyAyahCard :ayah="b.keyAyah" />
        <RefList :refs="b.refs" />
      </div>

      <StoryAside :id="b.id" :question-count="b.questions.length">
        <RouterLink
          v-if="b.id === 'kuran'"
          :to="{ name: 'surahs' }"
          class="card flex items-center gap-3 p-4 text-sm font-semibold text-primary hover:border-primary/40"
        >
          <AppIcon name="book" /> Kurany okamaga geç
          <AppIcon name="chevron-right" class="ml-auto" :size="16" />
        </RouterLink>
      </StoryAside>
    </div>

    <nav class="mt-6 flex items-center justify-between gap-3" aria-label="Kitaplar boýunça geçiş">
      <RouterLink v-if="prev" :to="{ name: 'book', params: { id: prev.id } }" class="btn-secondary">
        <AppIcon name="chevron-left" /> {{ prev.name }}
      </RouterLink>
      <span v-else />
      <RouterLink v-if="next" :to="{ name: 'book', params: { id: next.id } }" class="btn-primary">
        {{ next.name }} <AppIcon name="chevron-right" />
      </RouterLink>
      <RouterLink v-else :to="{ name: 'history-quiz', query: { scope: 'books' } }" class="btn-gold">
        Kitaplar synagy <AppIcon name="arrow-right" />
      </RouterLink>
    </nav>
  </div>

  <div v-else class="card p-10 text-center">
    <p class="text-muted">Kitap tapylmady.</p>
    <RouterLink :to="{ name: 'history' }" class="btn-primary mt-4">Yza gaýt</RouterLink>
  </div>
</template>
