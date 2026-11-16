<script setup lang="ts">
import { computed, ref } from 'vue'
import LetterTile from '@/components/letters/LetterTile.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import PageHeader from '@/components/ui/PageHeader.vue'
import ProgressBar from '@/components/ui/ProgressBar.vue'
import SegmentedControl from '@/components/ui/SegmentedControl.vue'
import { LETTER_BY_ID, LETTERS } from '@/data/letters'
import { useLettersStore, type LetterFilter } from '@/stores/letters'
import { useSettingsStore } from '@/stores/settings'

const store = useLettersStore()
const settings = useSettingsStore()

// Gaýtalamaly harp bar bolsa, ilki şolary görkezýäris
const filter = ref<LetterFilter>(store.state.review.length ? 'review' : 'all')

const filterOptions = computed(() => [
  { value: 'all' as const, label: 'Hemmesi', count: LETTERS.length },
  { value: 'unlearned' as const, label: 'Öwrenilmedik', count: LETTERS.length - store.progress.learned },
  { value: 'learned' as const, label: 'Öwrenilen', count: store.progress.learned },
  { value: 'review' as const, label: 'Gaýtalamaly', count: store.state.review.length },
])

const visible = computed(() => store.filtered(filter.value))

const lastLetter = computed(() => (store.state.lastLetterId ? LETTER_BY_ID[store.state.lastLetterId] : undefined))
const nextToLearn = computed(() => LETTERS.find((l) => !store.isLearned(l.id)))

const EMPTY: Record<LetterFilter, string> = {
  all: '',
  unlearned: 'Ähli harplary öwrendiňiz — maşalla! Indi synag bilen berkidiň.',
  learned: 'Entek “Öwrendim” bellik edilen harp ýok. Harpy açyp, öwrenenden soň bellik ediň.',
  review: 'Gaýtalamaly harp ýok. Synagda ýalňyşlan harplaryňyz şu ýere düşer.',
}
</script>

<template>
  <div>
    <PageHeader
      eyebrow="1-nji bölüm"
      title="Harplar we elipbiý"
      subtitle="Arap elipbiýiniň 28 harpyny sesi, ýazylyşy we mysallary bilen öwreniň."
    />

    <!-- Öňe gidiş we hereketler -->
    <div class="card mb-6 grid gap-5 p-5 sm:grid-cols-[1fr_auto] sm:items-center sm:p-6">
      <div>
        <div class="mb-2 flex items-baseline justify-between">
          <p class="font-semibold text-ink">Öwrenilen harplar</p>
          <p class="text-sm text-muted">
            <span class="text-lg font-bold text-primary">{{ store.progress.learned }}</span> / {{ store.progress.total }}
          </p>
        </div>
        <ProgressBar :value="store.progress.percent" label="Öwrenilen harplar" />
        <p v-if="lastLetter || nextToLearn" class="mt-3 text-sm text-muted">
          <template v-if="lastLetter">
            Soňky açylan:
            <RouterLink :to="{ name: 'letter', params: { id: lastLetter.id } }" class="font-semibold text-primary">
              {{ lastLetter.name }} <span lang="ar" class="font-arabic">{{ lastLetter.char }}</span>
            </RouterLink>
          </template>
          <template v-if="nextToLearn && nextToLearn.id !== lastLetter?.id">
            <span v-if="lastLetter"> · </span>Indiki öwreniljek:
            <RouterLink :to="{ name: 'letter', params: { id: nextToLearn.id } }" class="font-semibold text-primary">
              {{ nextToLearn.name }} <span lang="ar" class="font-arabic">{{ nextToLearn.char }}</span>
            </RouterLink>
          </template>
        </p>
      </div>
      <div class="flex flex-col gap-2 sm:w-56">
        <RouterLink :to="{ name: 'letters-quiz' }" class="btn-primary">
          <AppIcon name="quiz" /> Synag tabşyr
        </RouterLink>
        <RouterLink
          v-if="store.state.review.length"
          :to="{ name: 'letters-quiz', query: { scope: 'review' } }"
          class="btn-secondary"
        >
          <AppIcon name="refresh" /> Gaýtalamalary barla
        </RouterLink>
      </div>
    </div>

    <SegmentedControl v-model="filter" :options="filterOptions" label="Harplary süzmek" class="mb-5" />

    <TransitionGroup
      v-if="visible.length"
      tag="div"
      name="page"
      dir="rtl"
      class="grid grid-cols-3 gap-3 sm:grid-cols-5 lg:grid-cols-7"
    >
      <LetterTile
        v-for="l in visible"
        :key="l.id"
        dir="ltr"
        :letter="l"
        :learned="store.isLearned(l.id)"
        :review="store.inReview(l.id)"
        :show-translit="settings.settings.showTranslit"
      />
    </TransitionGroup>
    <div v-else class="card flex flex-col items-center gap-3 p-10 text-center text-muted">
      <AppIcon name="check" :size="32" class="text-primary" />
      <p class="max-w-sm">{{ EMPTY[filter] }}</p>
    </div>
  </div>
</template>
