<script setup lang="ts">
import { computed } from 'vue'
import type { ArabicLetter, LetterForm } from '@/types'
import { FORM_LABELS, letterForm } from '@/utils/arabic'

const props = defineProps<{ letter: ArabicLetter }>()
const FORMS: LetterForm[] = ['isolated', 'initial', 'medial', 'final']

const forms = computed(() =>
  FORMS.map((f) => ({ key: f, label: FORM_LABELS[f], glyph: letterForm(props.letter.char, f, props.letter.nonConnecting) })),
)
</script>

<template>
  <div>
    <!-- Arap ýazgysy sagdan çepe: tertibi hem şonuň ýaly görkezýäris -->
    <div class="grid grid-cols-4 gap-2" dir="rtl">
      <div v-for="f in forms" :key="f.key" class="rounded-xl bg-surface-2 py-3 text-center lg:py-2">
        <p lang="ar" class="glyph-safe font-arabic text-4xl text-ink lg:text-[clamp(1.75rem,4.5vh,2.25rem)]">{{ f.glyph }}</p>
        <p class="text-xs font-semibold text-muted" dir="ltr">{{ f.label }}</p>
      </div>
    </div>
    <p v-if="letter.nonConnecting" class="mt-3 text-sm text-muted">
      Bu harp özünden soňky (çepdäki) harp bilen birleşmeýär, şonuň üçin onuň başlangyç we orta görnüşleri ýok.
    </p>
  </div>
</template>
