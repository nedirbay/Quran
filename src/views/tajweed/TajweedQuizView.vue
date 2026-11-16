<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import QuizReport from '@/components/quiz/QuizReport.vue'
import QuizRunner from '@/components/quiz/QuizRunner.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import PageHeader from '@/components/ui/PageHeader.vue'
import { RULE_BY_ID, TAJWEED_RULES } from '@/data/tajweed'
import { buildAuthoredQuiz, scoreQuiz } from '@/services/quiz'
import { useTajweedStore } from '@/stores/tajweed'
import type { QuizAnswer, QuizQuestion, QuizResult } from '@/types'

const route = useRoute()
const router = useRouter()
const store = useTajweedStore()

/** ?rules=ustun,astyn — berlen bolsa diňe şolar, ýogsa ähli düzgünler */
const ruleIds = computed(() => {
  const raw = typeof route.query.rules === 'string' ? route.query.rules : ''
  const ids = raw.split(',').filter((id) => RULE_BY_ID[id])
  return ids.length ? ids : TAJWEED_RULES.map((r) => r.id)
})
const isSingle = computed(() => ruleIds.value.length === 1)

const questions = ref<QuizQuestion[]>([])
const result = ref<QuizResult | null>(null)
/** Her täze synagda QuizRunner täzeden döredilýär */
const runId = ref(0)

function start(ids = ruleIds.value) {
  questions.value = buildAuthoredQuiz(ids.map((id) => RULE_BY_ID[id]!))
  result.value = null
  runId.value++
}
start()

function onFinish(answers: QuizAnswer[]) {
  const r = scoreQuiz(answers)
  store.recordQuiz(r, ruleIds.value)
  result.value = r
}

function onExit() {
  if (window.confirm('Synagy bes etmek isleýärsiňizmi?')) router.back()
}

function retryWeak() {
  if (!result.value) return
  const ids = result.value.byTag.filter((t) => t.wrong > 0).map((t) => t.tag)
  router.replace({ query: { rules: ids.join(',') } })
  start(ids)
}

const title = computed(() => (isSingle.value ? `${RULE_BY_ID[ruleIds.value[0]!]!.title} — synag` : 'Tejwid boýunça synag'))
const tagLabel = (id: string) => RULE_BY_ID[id]?.title ?? id
const tagArabic = (id: string) => RULE_BY_ID[id]?.examples[0]?.arabic
</script>

<template>
  <div>
    <QuizRunner v-if="!result" :key="runId" :questions="questions" :title="title" @finish="onFinish" @exit="onExit" />

    <template v-else>
      <PageHeader eyebrow="Tejwid · Hasabat" :title="title" :back="{ name: 'tajweed' }" />
      <QuizReport :result="result" :questions="questions" :tag-label="tagLabel" :tag-arabic="tagArabic">
        <template #tag-action="{ tag }">
          <RouterLink :to="{ name: 'rule', params: { id: tag.tag } }" class="btn-secondary min-h-9 shrink-0 px-3 text-sm">
            Gaýtala <AppIcon name="chevron-right" :size="14" />
          </RouterLink>
        </template>
        <template #actions>
          <RouterLink :to="{ name: 'tajweed' }" class="btn-secondary">
            <AppIcon name="rules" /> Düzgünlere gaýt
          </RouterLink>
          <button v-if="result.wrong" type="button" class="btn-primary" @click="retryWeak">
            <AppIcon name="refresh" /> Ýalňyşlan düzgünler boýunça
          </button>
          <button v-else type="button" class="btn-primary" @click="start()">
            <AppIcon name="refresh" /> Täzeden tabşyr
          </button>
        </template>
      </QuizReport>
    </template>
  </div>
</template>
