<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import QuizReport from '@/components/quiz/QuizReport.vue'
import QuizRunner from '@/components/quiz/QuizRunner.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import PageHeader from '@/components/ui/PageHeader.vue'
import { BOOK_BY_ID, BOOKS } from '@/data/books'
import { PROPHET_BY_ID, PROPHETS } from '@/data/prophets'
import { buildAuthoredQuiz, scoreQuiz, type QuizSource } from '@/services/quiz'
import { useStoriesStore } from '@/stores/stories'
import type { QuizAnswer, QuizQuestion, QuizResult } from '@/types'
import { storyArabic, storyLabel, storyRoute } from '@/utils/history'

/**
 * ?ids=musa,isa  — saýlanan kitaplar/pygamberler
 * ?scope=books | prophets | weak | all
 */
const MAX_QUESTIONS = 15

const route = useRoute()
const router = useRouter()
const store = useStoriesStore()

const byId = (id: string): QuizSource | undefined => PROPHET_BY_ID[id] ?? BOOK_BY_ID[id]

const sources = computed<QuizSource[]>(() => {
  const ids = typeof route.query.ids === 'string' ? route.query.ids.split(',') : []
  if (ids.length) return ids.map(byId).filter((x): x is QuizSource => !!x)
  switch (route.query.scope) {
    case 'books':
      return BOOKS
    case 'weak':
      return store.weakIds.map(byId).filter((x): x is QuizSource => !!x)
    case 'all':
      return [...BOOKS, ...PROPHETS]
    default:
      return PROPHETS
  }
})

const title = computed(() => {
  if (sources.value.length === 1) return `${storyLabel(sources.value[0]!.id)} — synag`
  if (route.query.scope === 'books') return 'Ylahy kitaplar boýunça synag'
  if (route.query.scope === 'weak') return 'Ýalňyşlarym boýunça synag'
  return 'Pygamberler boýunça synag'
})

const questions = ref<QuizQuestion[]>([])
const result = ref<QuizResult | null>(null)
const runId = ref(0)

function start(list = sources.value) {
  questions.value = buildAuthoredQuiz(list).slice(0, MAX_QUESTIONS)
  result.value = null
  runId.value++
}
start()

function onFinish(answers: QuizAnswer[]) {
  const r = scoreQuiz(answers)
  store.recordQuiz(r)
  result.value = r
}

function onExit() {
  if (window.confirm('Synagy bes etmek isleýärsiňizmi?')) router.back()
}

function retryWrong() {
  if (!result.value) return
  const ids = result.value.byTag.filter((t) => t.wrong > 0).map((t) => t.tag)
  router.replace({ query: { ids: ids.join(',') } })
  start(ids.map(byId).filter((x): x is QuizSource => !!x))
}
</script>

<template>
  <div>
    <div v-if="!questions.length" class="card mx-auto max-w-lg p-10 text-center">
      <p class="text-muted">Bu toplum üçin sorag ýok.</p>
      <RouterLink :to="{ name: 'history' }" class="btn-primary mt-4">Yza gaýt</RouterLink>
    </div>

    <QuizRunner v-else-if="!result" :key="runId" :questions="questions" :title="title" @finish="onFinish" @exit="onExit" />

    <template v-else>
      <PageHeader eyebrow="Kitaplar we pygamberler · Hasabat" :title="title" :back="{ name: 'history' }" />
      <QuizReport :result="result" :questions="questions" :tag-label="storyLabel" :tag-arabic="storyArabic">
        <template #tag-action="{ tag }">
          <RouterLink :to="storyRoute(tag.tag)" class="btn-secondary min-h-9 shrink-0 px-3 text-sm">
            Gaýtadan oka <AppIcon name="chevron-right" :size="14" />
          </RouterLink>
        </template>
        <template #actions>
          <RouterLink :to="{ name: 'history' }" class="btn-secondary">
            <AppIcon name="history" /> Bölüme gaýt
          </RouterLink>
          <button v-if="result.wrong" type="button" class="btn-primary" @click="retryWrong">
            <AppIcon name="refresh" /> Ýalňyşlar boýunça täzeden
          </button>
          <button v-else type="button" class="btn-primary" @click="start()">
            <AppIcon name="refresh" /> Täze soraglar
          </button>
        </template>
      </QuizReport>
    </template>
  </div>
</template>
