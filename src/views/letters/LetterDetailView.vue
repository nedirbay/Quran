<script setup lang="ts">
import { computed, watchEffect } from 'vue'
import LetterForms from '@/components/letters/LetterForms.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import AudioButton from '@/components/ui/AudioButton.vue'
import PageHeader from '@/components/ui/PageHeader.vue'
import { audioUrls } from '@/config'
import { LETTER_BY_ID, LETTERS } from '@/data/letters'
import { useLettersStore } from '@/stores/letters'
import { HARAKAT } from '@/utils/arabic'

const props = defineProps<{ id: string }>()
const store = useLettersStore()

const letter = computed(() => LETTER_BY_ID[props.id])
const prev = computed(() => (letter.value ? LETTERS[letter.value.order - 2] : undefined))
const next = computed(() => (letter.value ? LETTERS[letter.value.order] : undefined))
const learned = computed(() => store.isLearned(props.id))
const stat = computed(() => store.state.stats[props.id])

watchEffect(() => {
  if (letter.value) store.setLastLetter(letter.value.id)
})

/** Harp üç hereket bilen: üstün, astyn, ötre (älif hemze görnüşinde okalýar: أَ إِ أُ) */
const syllables = computed(() => {
  const l = letter.value
  if (!l) return []
  const isAlif = l.id === 'alif'
  const variants = [
    { v: 'a', name: 'Üstün', mark: HARAKAT.ustun, carrier: isAlif ? 'أ' : l.char },
    { v: 'i', name: 'Astyn', mark: HARAKAT.astyn, carrier: isAlif ? 'إ' : l.char },
    { v: 'u', name: 'Ötre', mark: HARAKAT.otre, carrier: isAlif ? 'أ' : l.char },
  ]
  return variants.map((x) => ({
    key: `${l.id}-${x.v}`,
    text: x.carrier + x.mark,
    name: x.name,
    translit: isAlif ? x.v : l.translit + x.v,
  }))
})
</script>

<template>
  <div v-if="letter">
    <PageHeader
      :eyebrow="`${letter.order}-nji harp · 28-den`"
      :title="`${letter.name} harpy`"
      :back="{ name: 'letters' }"
    >
      <template #actions>
        <span v-if="store.inReview(letter.id)" class="chip bg-danger-soft py-1 text-danger">
          <AppIcon name="refresh" :size="12" /> Gaýtalamaly
        </span>
      </template>
    </PageHeader>

    <div class="grid gap-5 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
      <!-- Uly harp -->
      <section class="card relative flex flex-col items-center overflow-hidden p-6 text-center sm:p-8">
        <div class="pointer-events-none absolute inset-x-0 top-0 h-1 bg-linear-to-r from-gold/0 via-gold to-gold/0" />
        <p lang="ar" class="font-arabic text-[9rem] leading-[1.45] text-primary sm:text-[11rem]">{{ letter.char }}</p>
        <p class="text-2xl font-bold text-ink">{{ letter.name }}</p>
        <p class="mt-1 text-muted">
          <span lang="ar" class="font-arabic text-xl">{{ letter.arabicName }}</span> · {{ letter.translit }}
        </p>
        <AudioButton
          class="mt-5"
          size="lg"
          :audio-key="`letter-${letter.id}`"
          :request="{ url: audioUrls.letter(letter.id), ttsText: letter.arabicName }"
          label="Adyny diňle"
        />

        <button
          type="button"
          class="mt-6 w-full"
          :class="learned ? 'btn border-2 border-primary/40 bg-primary-soft text-primary' : 'btn-gold'"
          :aria-pressed="learned"
          @click="store.toggleLearned(letter.id)"
        >
          <AppIcon :name="learned ? 'check' : 'bookmark'" />
          {{ learned ? 'Öwrenildi (belligi aýyr)' : 'Öwrendim — bellik et' }}
        </button>
        <p v-if="stat" class="mt-3 text-xs text-muted">
          Synaglarda: {{ stat.attempts }} gezek soralyp, {{ stat.mistakes }} gezek ýalňyşyldy
        </p>
      </section>

      <div class="space-y-5">
        <!-- Hereketler bilen okalyşy -->
        <section class="card p-5 sm:p-6">
          <h2 class="mb-1 text-lg font-bold text-ink">Hereketler bilen okalyşy</h2>
          <p class="mb-4 text-sm text-muted">Her bogna basyp, sesini diňläň we gaýtalaň.</p>
          <div class="grid grid-cols-3 gap-3" dir="rtl">
            <div v-for="s in syllables" :key="s.key" class="flex flex-col items-center rounded-xl bg-surface-2 p-3">
              <p lang="ar" class="font-arabic text-5xl leading-[1.6] text-ink">{{ s.text }}</p>
              <p class="text-sm font-bold text-primary" dir="ltr">{{ s.translit }}</p>
              <p class="mb-2 text-xs text-muted" dir="ltr">{{ s.name }}</p>
              <AudioButton
                size="sm"
                :audio-key="`syl-${s.key}`"
                :request="{ url: audioUrls.letter(s.key), ttsText: s.text }"
              />
            </div>
          </div>
        </section>

        <!-- Ýazylyş görnüşleri -->
        <section class="card p-5 sm:p-6">
          <h2 class="mb-4 text-lg font-bold text-ink">Ýazylyş görnüşleri</h2>
          <LetterForms :letter="letter" />
        </section>

        <!-- Okalyş ýeri -->
        <section class="card p-5 sm:p-6">
          <h2 class="mb-2 text-lg font-bold text-ink">Nähili aýdylýar?</h2>
          <p class="leading-relaxed text-ink/90">{{ letter.pronunciation }}</p>
        </section>

        <!-- Mysal söz -->
        <section class="card flex items-center gap-4 p-5 sm:p-6">
          <div class="flex-1">
            <h2 class="text-sm font-semibold text-muted">Mysal söz</h2>
            <p class="mt-1 text-lg">
              <span class="font-bold text-ink">{{ letter.example.translit }}</span>
              <span class="text-muted"> — {{ letter.example.meaning }}</span>
            </p>
          </div>
          <p lang="ar" dir="rtl" class="font-arabic text-5xl leading-[1.6] text-primary">{{ letter.example.arabic }}</p>
          <AudioButton :audio-key="`ex-${letter.id}`" :request="{ ttsText: letter.example.arabic }" />
        </section>
      </div>
    </div>

    <!-- Öňki / indiki -->
    <nav class="mt-6 flex items-center justify-between gap-3" aria-label="Harplar boýunça geçiş">
      <RouterLink v-if="prev" :to="{ name: 'letter', params: { id: prev.id } }" class="btn-secondary">
        <AppIcon name="chevron-left" /> {{ prev.name }}
        <span lang="ar" class="font-arabic text-xl">{{ prev.char }}</span>
      </RouterLink>
      <span v-else />
      <RouterLink v-if="next" :to="{ name: 'letter', params: { id: next.id } }" class="btn-primary">
        <span lang="ar" class="font-arabic text-xl">{{ next.char }}</span> {{ next.name }}
        <AppIcon name="chevron-right" />
      </RouterLink>
      <RouterLink v-else :to="{ name: 'letters-quiz' }" class="btn-gold">
        Synag tabşyr <AppIcon name="arrow-right" />
      </RouterLink>
    </nav>
  </div>

  <div v-else class="card p-10 text-center">
    <p class="text-muted">Harp tapylmady.</p>
    <RouterLink :to="{ name: 'letters' }" class="btn-primary mt-4">Harplara gaýt</RouterLink>
  </div>
</template>
