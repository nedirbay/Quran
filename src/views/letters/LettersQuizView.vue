<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import QuizReport from '@/components/quiz/QuizReport.vue'
import QuizRunner from '@/components/quiz/QuizRunner.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import PageHeader from '@/components/ui/PageHeader.vue'
import { LETTER_BY_ID, LETTERS } from '@/data/letters'
import { buildLetterQuiz, scoreQuiz } from '@/services/quiz'
import { useLettersStore } from '@/stores/letters'
import { useSettingsStore } from '@/stores/settings'
import type { ArabicLetter, QuizAnswer, QuizQuestion, QuizResult } from '@/types'

type Scope = 'all' | 'learned' | 'unlearned' | 'review' | 'weak'
type Phase = 'setup' | 'running' | 'report'

const route = useRoute()
const router = useRouter()
const store = useLettersStore()
const settings = useSettingsStore()

const phase = ref<Phase>('setup')
const scope = ref<Scope>((route.query.scope as Scope) ?? 'all')
const count = ref(10)
const questions = ref<QuizQuestion[]>([])
const result = ref<QuizResult | null>(null)
const autoAdded = ref<string[]>([])

const scopes = computed(() => {
  const list: { value: Scope; label: string; hint: string; pool: ArabicLetter[] }[] = [
    { value: 'all', label: 'Ähli harplar', hint: 'Elipbiýiň 28 harpy', pool: LETTERS },
    { value: 'learned', label: 'Öwrenen harplarym', hint: 'Bellik edilenler', pool: store.filtered('learned') },
    { value: 'unlearned', label: 'Öwrenmedik harplarym', hint: 'Bellik edilmedikler', pool: store.filtered('unlearned') },
    { value: 'review', label: 'Gaýtalamaly harplar', hint: 'Ýalňyşlyk sanawy', pool: store.filtered('review') },
    {
      value: 'weak',
      label: 'Iň köp ýalňyşýanlarym',
      hint: 'Statistika boýunça',
      pool: store.weakLetters.slice(0, 8).map((w) => w.letter),
    },
  ]
  return list
})

const selectedPool = computed(() => scopes.value.find((s) => s.value === scope.value)?.pool ?? [])

function start(pool: ArabicLetter[] = selectedPool.value, n = count.value) {
  questions.value = buildLetterQuiz(pool, LETTERS, n)
  result.value = null
  autoAdded.value = []
  phase.value = 'running'
}

function onFinish(answers: QuizAnswer[]) {
  const r = scoreQuiz(answers)
  result.value = r
  const wrong = store.recordQuiz(r)
  autoAdded.value = settings.settings.autoAddMistakes ? wrong : []
  phase.value = 'report'
}

function onExit() {
  if (window.confirm('Synagy bes etmek isleýärsiňizmi? Jogaplar ýatda saklanmaz.')) phase.value = 'setup'
}

function retryMistakes() {
  if (!result.value) return
  const pool = result.value.byTag.filter((t) => t.wrong > 0).map((t) => LETTER_BY_ID[t.tag]!)
  start(pool, Math.max(pool.length * 2, 6))
}

const tagLabel = (id: string) => LETTER_BY_ID[id]?.name ?? id
const tagArabic = (id: string) => LETTER_BY_ID[id]?.char
</script>

<template>
  <div>
    <!-- Sazlama -->
    <template v-if="phase === 'setup'">
      <PageHeader
        eyebrow="Harplar · Synag"
        title="Bilimiňizi barlaň"
        subtitle="Synag harplary tanamak, sesinden tapmak we söz içindäki görnüşini bilmek boýunça soraglardan ybarat."
        :back="{ name: 'letters' }"
      />

      <div class="mx-auto max-w-2xl space-y-6">
        <fieldset class="card p-5 sm:p-6">
          <legend class="sr-only">Haýsy harplar boýunça?</legend>
          <h2 class="mb-4 text-lg font-bold text-ink">Haýsy harplar boýunça?</h2>
          <div class="grid gap-2">
            <label
              v-for="s in scopes"
              :key="s.value"
              class="flex cursor-pointer items-center gap-4 rounded-xl border-2 p-4 transition-colors"
              :class="[
                scope === s.value ? 'border-primary bg-primary-soft' : 'border-line hover:border-primary/40',
                !s.pool.length && 'pointer-events-none opacity-45',
              ]"
            >
              <input v-model="scope" type="radio" name="scope" :value="s.value" class="sr-only" :disabled="!s.pool.length" />
              <span
                class="flex size-5 items-center justify-center rounded-full border-2"
                :class="scope === s.value ? 'border-primary' : 'border-line'"
              >
                <span v-if="scope === s.value" class="size-2.5 rounded-full bg-primary" />
              </span>
              <span class="flex-1">
                <span class="block font-semibold text-ink">{{ s.label }}</span>
                <span class="block text-sm text-muted">{{ s.hint }}</span>
              </span>
              <span class="chip bg-surface-2 text-muted">{{ s.pool.length }} harp</span>
            </label>
          </div>
        </fieldset>

        <fieldset class="card p-5 sm:p-6">
          <h2 class="mb-4 text-lg font-bold text-ink">Sorag sany</h2>
          <div class="grid grid-cols-3 gap-2">
            <button
              v-for="n in [10, 20, 30]"
              :key="n"
              type="button"
              class="btn border-2"
              :class="count === n ? 'border-primary bg-primary-soft text-primary' : 'border-line text-ink'"
              :aria-pressed="count === n"
              @click="count = n"
            >
              {{ n }}
            </button>
          </div>
        </fieldset>

        <button type="button" class="btn-primary w-full text-base" :disabled="!selectedPool.length" @click="start()">
          <AppIcon name="play" /> Synagy başla
        </button>
      </div>
    </template>

    <!-- Synag -->
    <QuizRunner
      v-else-if="phase === 'running'"
      :questions="questions"
      title="Harplar boýunça synag"
      @finish="onFinish"
      @exit="onExit"
    />

    <!-- Hasabat -->
    <template v-else-if="result">
      <PageHeader eyebrow="Harplar · Hasabat" title="Ýalňyş analizi" :back="{ name: 'letters' }" />

      <div
        v-if="autoAdded.length"
        class="mx-auto mb-5 flex max-w-3xl items-start gap-3 rounded-2xl border border-gold/40 bg-gold-soft p-4 text-sm text-ink"
      >
        <AppIcon name="refresh" class="mt-0.5 text-gold" />
        <p>
          Ýalňyşlan <b>{{ autoAdded.length }}</b> harp awtomatiki “Gaýtalamaly” sanawyna goşuldy.
          <RouterLink :to="{ name: 'settings' }" class="font-semibold text-primary underline">Sazlamalardan</RouterLink>
          öçürip bilersiňiz.
        </p>
      </div>

      <QuizReport :result="result" :questions="questions" :tag-label="tagLabel" :tag-arabic="tagArabic">
        <template #weak-actions="{ weak }">
          <button
            v-if="weak.some((t) => !store.inReview(t.tag))"
            type="button"
            class="btn-gold min-h-10 text-sm"
            @click="store.addToReview(weak.map((t) => t.tag))"
          >
            <AppIcon name="plus" :size="16" /> Hemmesini gaýtalama goş
          </button>
        </template>

        <template #tag-action="{ tag }">
          <span v-if="store.inReview(tag.tag)" class="chip shrink-0 bg-primary-soft py-1.5 text-primary">
            <AppIcon name="check" :size="12" /> Sanawda
          </span>
          <button
            v-else
            type="button"
            class="btn-secondary min-h-9 shrink-0 px-3 text-sm"
            @click="store.addToReview([tag.tag])"
          >
            <AppIcon name="plus" :size="14" /> Goş
          </button>
        </template>

        <template #actions>
          <button type="button" class="btn-secondary" @click="phase = 'setup'">
            <AppIcon name="settings" /> Täze synag
          </button>
          <RouterLink v-if="store.state.review.length" :to="{ name: 'letters' }" class="btn-secondary">
            <AppIcon name="letters" /> Gaýtalamaly harplary öwren
          </RouterLink>
          <button v-if="result.wrong" type="button" class="btn-primary" @click="retryMistakes">
            <AppIcon name="refresh" /> Ýalňyşlar boýunça täzeden
          </button>
          <button v-else type="button" class="btn-primary" @click="router.push({ name: 'letters' })">
            Dowam et <AppIcon name="arrow-right" />
          </button>
        </template>
      </QuizReport>
    </template>
  </div>
</template>
