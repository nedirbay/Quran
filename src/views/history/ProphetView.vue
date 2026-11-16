<script setup lang="ts">
import { computed, watchEffect } from 'vue'
import KeyAyahCard from '@/components/history/KeyAyahCard.vue'
import RefList from '@/components/history/RefList.vue'
import StoryAside from '@/components/history/StoryAside.vue'
import StorySections from '@/components/history/StorySections.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import PageHeader from '@/components/ui/PageHeader.vue'
import RichText from '@/components/ui/RichText.vue'
import { BOOK_BY_ID } from '@/data/books'
import { PROPHET_BY_ID, PROPHETS } from '@/data/prophets'
import { useStoriesStore } from '@/stores/stories'
import { honorific } from '@/utils/history'

const props = defineProps<{ id: string }>()
const store = useStoriesStore()

const p = computed(() => PROPHET_BY_ID[props.id])
const prev = computed(() => (p.value ? PROPHETS[p.value.order - 2] : undefined))
const next = computed(() => (p.value ? PROPHETS[p.value.order] : undefined))
const book = computed(() => (p.value?.bookId ? BOOK_BY_ID[p.value.bookId] : undefined))

const facts = computed(() => {
  const x = p.value
  if (!x) return []
  return [
    { label: 'Iberilen halky', value: x.sentTo },
    x.period && { label: 'Döwri', value: x.period },
    x.family && { label: 'Maşgalasy', value: x.family },
  ].filter(Boolean) as { label: string; value: string }[]
})

watchEffect(() => {
  if (p.value) store.setLast(p.value.id)
})
</script>

<template>
  <div v-if="p">
    <PageHeader
      :eyebrow="`${p.order}-nji pygamber · ${PROPHETS.length}-den`"
      :title="`${p.name} ${honorific(p)}`"
      :subtitle="p.title"
      :back="{ name: 'history', query: { tab: 'prophets' } }"
    />

    <div class="grid gap-5 lg:grid-cols-[minmax(0,1fr)_18rem]">
      <div class="min-w-0 space-y-5">
        <!-- Esasy maglumat -->
        <section class="card relative overflow-hidden">
          <div class="flex flex-col items-center gap-5 bg-primary px-6 py-8 text-on-primary sm:flex-row sm:px-8">
            <p lang="ar" class="font-quran text-7xl leading-[1.6] text-gold">{{ p.arabicName }}</p>
            <div class="flex-1 text-center sm:text-left">
              <div class="mb-2 flex flex-wrap justify-center gap-2 sm:justify-start">
                <span v-if="p.ululAzm" class="chip bg-gold text-white">Ulul-azm</span>
                <span v-if="store.isRead(p.id)" class="chip bg-white/15 text-on-primary"><AppIcon name="check" :size="12" /> Okaldy</span>
              </div>
              <p class="text-[17px] leading-relaxed opacity-95"><RichText :text="p.summary" /></p>
            </div>
          </div>
          <dl class="grid gap-px bg-line sm:grid-cols-2">
            <div v-for="f in facts" :key="f.label" class="bg-surface px-5 py-3.5">
              <dt class="text-xs font-semibold text-muted">{{ f.label }}</dt>
              <dd class="mt-0.5 text-sm font-semibold text-ink"><RichText :text="f.value" /></dd>
            </div>
            <div v-if="book" class="bg-surface px-5 py-3.5">
              <dt class="text-xs font-semibold text-muted">Inderilen kitap</dt>
              <dd class="mt-0.5">
                <RouterLink :to="{ name: 'book', params: { id: book.id } }" class="text-sm font-semibold text-primary underline">
                  {{ book.name }}
                </RouterLink>
              </dd>
            </div>
          </dl>
        </section>

        <StorySections :sections="p.sections" />

        <KeyAyahCard :ayah="p.keyAyah" />

        <section class="card p-5 sm:p-6">
          <h2 class="mb-4 text-lg font-bold text-ink">Alynýan sapaklar</h2>
          <ul class="space-y-3">
            <li v-for="l in p.lessons" :key="l" class="flex gap-3 text-[16px] leading-relaxed text-ink/90">
              <span class="mt-2 size-2 shrink-0 rotate-45 bg-gold" aria-hidden="true" />
              <span><RichText :text="l" /></span>
            </li>
          </ul>
        </section>

        <RefList :refs="p.refs" />
      </div>

      <StoryAside :id="p.id" :question-count="p.questions.length" />
    </div>

    <nav class="mt-6 flex items-center justify-between gap-3" aria-label="Pygamberler boýunça geçiş">
      <RouterLink v-if="prev" :to="{ name: 'prophet', params: { id: prev.id } }" class="btn-secondary">
        <AppIcon name="chevron-left" /> {{ prev.name }}
      </RouterLink>
      <span v-else />
      <RouterLink v-if="next" :to="{ name: 'prophet', params: { id: next.id } }" class="btn-primary">
        {{ next.name }} <AppIcon name="chevron-right" />
      </RouterLink>
      <RouterLink v-else :to="{ name: 'history-quiz', query: { scope: 'prophets' } }" class="btn-gold">
        Umumy synag <AppIcon name="arrow-right" />
      </RouterLink>
    </nav>
  </div>

  <div v-else class="card p-10 text-center">
    <p class="text-muted">Maglumat tapylmady.</p>
    <RouterLink :to="{ name: 'history' }" class="btn-primary mt-4">Yza gaýt</RouterLink>
  </div>
</template>
