<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import AudioButton from '@/components/ui/AudioButton.vue'
import ProgressBar from '@/components/ui/ProgressBar.vue'
import RichText from '@/components/ui/RichText.vue'
import { useAudio } from '@/services/audio'
import { useSettingsStore } from '@/stores/settings'
import type { QuizAnswer, QuizQuestion } from '@/types'

/**
 * Umumy quiz dolandyryjysy — harplar we tejwid modullary üçin bir komponent.
 * Klawiatura: 1–4 jogap saýlamak, Enter — indiki sorag.
 */
const props = defineProps<{ questions: QuizQuestion[]; title?: string }>()
const emit = defineEmits<{ finish: [answers: QuizAnswer[]]; exit: [] }>()

const audio = useAudio()
const settings = useSettingsStore()

const index = ref(0)
const chosen = ref<string | null>(null)
const answers = ref<QuizAnswer[]>([])

const question = computed(() => props.questions[index.value]!)
const isLast = computed(() => index.value === props.questions.length - 1)
const progress = computed(() => ((index.value + (chosen.value ? 1 : 0)) / props.questions.length) * 100)
const correctCount = computed(() => answers.value.filter((a) => a.correct).length)
/** Uzyn jogaplar bir sütünde görkezilýär */
const wideOptions = computed(() => question.value.options.some((o) => !o.arabic && o.label.length > 22))

function choose(optionId: string) {
  if (chosen.value) return
  chosen.value = optionId
  answers.value.push({
    questionId: question.value.id,
    tag: question.value.tag,
    chosenId: optionId,
    correct: optionId === question.value.correctId,
  })
}

function next() {
  if (!chosen.value) return
  audio.stop()
  if (isLast.value) {
    emit('finish', answers.value)
    return
  }
  index.value++
  chosen.value = null
}

function optionState(id: string): 'idle' | 'correct' | 'wrong' | 'muted' {
  if (!chosen.value) return 'idle'
  if (id === question.value.correctId) return 'correct'
  if (id === chosen.value) return 'wrong'
  return 'muted'
}

// Sesli soraglarda sesi awtomatiki bir gezek oýnadýarys
watch(
  question,
  (q) => {
    if (q.audio) audio.play(q.audio, `quiz-${q.id}`, settings.settings.playbackRate)
  },
  { immediate: true },
)

function onKey(e: KeyboardEvent) {
  if (e.key === 'Enter') return next()
  const n = Number(e.key)
  if (n >= 1 && n <= question.value.options.length) choose(question.value.options[n - 1]!.id)
}
onMounted(() => window.addEventListener('keydown', onKey))
onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKey)
  audio.stop()
})
</script>

<template>
  <section class="mx-auto max-w-2xl" aria-live="polite">
    <!-- Ýagdaý setiri -->
    <div class="mb-5 flex items-center gap-3">
      <button type="button" class="btn-icon -ml-2" aria-label="Synagy bes et" @click="emit('exit')">
        <AppIcon name="x" :size="22" />
      </button>
      <div class="flex-1">
        <div class="mb-1.5 flex justify-between gap-3 text-sm font-semibold text-muted">
          <span class="truncate">{{ title ?? 'Synag' }}</span>
          <span class="shrink-0">{{ index + 1 }} / {{ questions.length }}</span>
        </div>
        <ProgressBar :value="progress" tone="gold" label="Synagyň öňe gidişi" />
      </div>
      <span class="chip bg-success-soft text-success" title="Dogry jogaplar">
        <AppIcon name="check" :size="14" /> {{ correctCount }}
      </span>
    </div>

    <!-- Sorag -->
    <div class="card p-6 text-center sm:p-8">
      <p class="text-lg font-semibold text-ink"><RichText :text="question.prompt" /></p>

      <p
        v-if="question.arabic"
        lang="ar"
        dir="rtl"
        class="glyph-safe mt-2 font-arabic text-7xl text-primary sm:text-8xl"
      >
        {{ question.arabic }}
      </p>

      <div v-if="question.audio" class="mt-5 flex justify-center">
        <AudioButton :audio-key="`quiz-${question.id}`" :request="question.audio" label="Gaýtadan diňle" size="lg" />
      </div>
    </div>

    <!-- Jogaplar -->
    <div class="mt-4 grid gap-3" :class="wideOptions ? 'grid-cols-1' : 'grid-cols-2'">
      <button
        v-for="(o, i) in question.options"
        :key="o.id"
        type="button"
        class="relative flex min-h-16 items-center justify-center rounded-2xl border-2 px-6 py-3 text-center font-semibold transition-all"
        :class="{
          'border-line bg-surface text-ink hover:border-primary hover:bg-primary-soft': optionState(o.id) === 'idle',
          'border-success bg-success-soft text-success': optionState(o.id) === 'correct',
          'border-danger bg-danger-soft text-danger': optionState(o.id) === 'wrong',
          'border-line bg-surface text-muted opacity-60': optionState(o.id) === 'muted',
        }"
        :disabled="!!chosen"
        @click="choose(o.id)"
      >
        <span class="absolute top-2 left-3 text-xs font-bold text-muted/70">{{ i + 1 }}</span>
        <span v-if="o.arabic" lang="ar" dir="rtl" class="glyph-safe font-arabic text-4xl">{{ o.label }}</span>
        <span v-else class="flex items-center gap-3 text-base">
          <span v-if="o.glyph" lang="ar" class="glyph-safe font-arabic text-3xl">{{ o.glyph }}</span>
          <RichText :text="o.label" />
        </span>
      </button>
    </div>

    <!-- Netije we indiki -->
    <Transition name="page">
      <div v-if="chosen" class="mt-5 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
        <p
          class="flex flex-1 items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold"
          :class="answers.at(-1)?.correct ? 'bg-success-soft text-success' : 'bg-danger-soft text-danger'"
        >
          <AppIcon :name="answers.at(-1)?.correct ? 'check' : 'alert'" :size="18" />
          <span>
            {{ answers.at(-1)?.correct ? 'Dogry! Berekella.' : 'Ýalňyş.' }}
            <span v-if="!answers.at(-1)?.correct && question.explanation" class="font-normal">
              <RichText :text="question.explanation" />
            </span>
          </span>
        </p>
        <button type="button" class="btn-primary sm:min-w-40" autofocus @click="next">
          {{ isLast ? 'Netijäni gör' : 'Indiki' }}
          <AppIcon name="arrow-right" :size="18" />
        </button>
      </div>
    </Transition>
  </section>
</template>
