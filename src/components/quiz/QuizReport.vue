<script setup lang="ts">
import { computed } from 'vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import ProgressBar from '@/components/ui/ProgressBar.vue'
import ProgressRing from '@/components/ui/ProgressRing.vue'
import RichText from '@/components/ui/RichText.vue'
import type { QuizQuestion, QuizResult, TagReport } from '@/types'

/**
 * Quiz hasabaty: umumy netije, bölümler boýunça ýalňyş analizi we ýalňyş jogaplaryň sanawy.
 * `tag-action` slot-y arkaly her bölüm üçin hereket düwmesi goşup bolýar
 * (mysal: “Gaýtalama sanawyna goş”).
 */
const props = defineProps<{
  result: QuizResult
  questions: QuizQuestion[]
  tagLabel: (tag: string) => string
  tagArabic?: (tag: string) => string | undefined
}>()

defineSlots<{
  'tag-action'?: (p: { tag: TagReport }) => unknown
  'weak-actions'?: (p: { weak: TagReport[] }) => unknown
  actions?: () => unknown
}>()

const weak = computed(() => props.result.byTag.filter((t) => t.wrong > 0))
const strong = computed(() => props.result.byTag.filter((t) => t.wrong === 0))

const verdict = computed(() => {
  const p = props.result.percent
  if (p === 100) return { title: 'Maşalla! Ähli jogaplar dogry.', tone: 'text-success' }
  if (p >= 80) return { title: 'Gaty gowy netije!', tone: 'text-success' }
  if (p >= 50) return { title: 'Erbet däl — azajyk gaýtalamak gerek.', tone: 'text-gold' }
  return { title: 'Bu bölümi täzeden öwrenmek maslahat berilýär.', tone: 'text-danger' }
})

const wrongAnswers = computed(() =>
  props.result.answers
    .filter((a) => !a.correct)
    .map((a) => {
      const q = props.questions.find((x) => x.id === a.questionId)!
      return {
        q,
        chosen: q.options.find((o) => o.id === a.chosenId)!,
        correct: q.options.find((o) => o.id === q.correctId)!,
      }
    }),
)
</script>

<template>
  <section class="mx-auto max-w-3xl space-y-5">
    <!-- Umumy netije -->
    <div class="card flex flex-col items-center gap-5 p-6 text-center sm:flex-row sm:text-left">
      <ProgressRing :value="result.percent" :size="112" :stroke="9">
        <span class="text-2xl">{{ result.percent }}%</span>
      </ProgressRing>
      <div class="flex-1">
        <p class="eyebrow">Synagyň netijesi</p>
        <h2 class="mt-1 text-xl font-bold" :class="verdict.tone">{{ verdict.title }}</h2>
        <div class="mt-4 grid grid-cols-3 gap-3">
          <div class="rounded-xl bg-surface-2 p-3 text-center">
            <p class="text-2xl font-bold text-ink">{{ result.total }}</p>
            <p class="text-xs text-muted">Sorag</p>
          </div>
          <div class="rounded-xl bg-success-soft p-3 text-center">
            <p class="text-2xl font-bold text-success">{{ result.correct }}</p>
            <p class="text-xs text-success">Dogry</p>
          </div>
          <div class="rounded-xl bg-danger-soft p-3 text-center">
            <p class="text-2xl font-bold text-danger">{{ result.wrong }}</p>
            <p class="text-xs text-danger">Ýalňyş</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Ýalňyş analizi -->
    <div v-if="weak.length" class="card p-5 sm:p-6">
      <div class="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 class="flex items-center gap-2 text-lg font-bold text-ink">
            <AppIcon name="target" class="text-danger" /> Bökdençlik bar ýerler
          </h3>
          <p class="text-sm text-muted">Iň köp ýalňyşylanlardan başlap tertiplenen</p>
        </div>
        <slot name="weak-actions" :weak="weak" />
      </div>
      <ul class="divide-y divide-line">
        <li v-for="t in weak" :key="t.tag" class="flex items-center gap-4 py-3">
          <span
            v-if="tagArabic?.(t.tag)"
            lang="ar"
            class="flex h-12 min-w-12 shrink-0 items-center justify-center rounded-xl bg-danger-soft px-2 font-arabic text-2xl whitespace-nowrap text-danger"
            >{{ tagArabic(t.tag) }}</span
          >
          <div class="min-w-0 flex-1">
            <div class="flex items-baseline justify-between gap-2">
              <p class="truncate font-semibold text-ink"><RichText :text="tagLabel(t.tag)" /></p>
              <p class="shrink-0 text-sm text-danger">{{ t.wrong }} / {{ t.total }} ýalňyş</p>
            </div>
            <ProgressBar class="mt-2" :value="(t.wrong / t.total) * 100" tone="danger" />
          </div>
          <slot name="tag-action" :tag="t" />
        </li>
      </ul>
    </div>

    <div v-if="strong.length" class="card p-5 sm:p-6">
      <h3 class="mb-3 flex items-center gap-2 text-lg font-bold text-ink">
        <AppIcon name="check" class="text-success" /> Ýalňyşsyz
      </h3>
      <div class="flex flex-wrap gap-2">
        <span v-for="t in strong" :key="t.tag" class="chip bg-success-soft py-1.5 text-sm text-success">
          <span v-if="tagArabic?.(t.tag)" lang="ar" class="font-arabic text-lg leading-none">{{ tagArabic(t.tag) }}</span>
          <RichText :text="tagLabel(t.tag)" />
        </span>
      </div>
    </div>

    <!-- Ýalňyş jogaplar -->
    <details v-if="wrongAnswers.length" class="card group p-5 sm:p-6">
      <summary class="flex cursor-pointer list-none items-center justify-between font-bold text-ink">
        Ýalňyş jogaplary gör ({{ wrongAnswers.length }})
        <AppIcon name="chevron-right" class="transition-transform group-open:rotate-90" />
      </summary>
      <ul class="mt-4 space-y-3">
        <li v-for="w in wrongAnswers" :key="w.q.id" class="rounded-xl bg-surface-2 p-4 text-sm">
          <p class="font-semibold text-ink">
            <RichText :text="w.q.prompt" />
            <span v-if="w.q.arabic" lang="ar" class="mx-1 font-arabic text-2xl text-primary">{{ w.q.arabic }}</span>
          </p>
          <p class="mt-2 text-danger">
            Siziň jogabyňyz:
            <span v-if="w.chosen.glyph" lang="ar" class="font-arabic text-xl">{{ w.chosen.glyph }} </span
            ><span :lang="w.chosen.arabic ? 'ar' : undefined" :class="w.chosen.arabic && 'font-arabic text-xl'">{{
              w.chosen.label
            }}</span>
          </p>
          <p class="text-success">
            Dogry jogap:
            <span v-if="w.correct.glyph" lang="ar" class="font-arabic text-xl">{{ w.correct.glyph }} </span
            ><span :lang="w.correct.arabic ? 'ar' : undefined" :class="w.correct.arabic && 'font-arabic text-xl'">{{
              w.correct.label
            }}</span>
          </p>
        </li>
      </ul>
    </details>

    <div class="flex flex-col gap-3 sm:flex-row sm:justify-end">
      <slot name="actions" />
    </div>
  </section>
</template>
