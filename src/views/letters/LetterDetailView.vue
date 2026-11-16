<script setup lang="ts">
import { computed, watchEffect } from 'vue'
import LetterForms from '@/components/letters/LetterForms.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import AudioButton from '@/components/ui/AudioButton.vue'
import PageHeader from '@/components/ui/PageHeader.vue'
import { audioUrls } from '@/config'
import { LETTER_BY_ID, LETTERS } from '@/data/letters'
import { useLettersStore } from '@/stores/letters'
import { letterSyllables } from '@/utils/arabic'

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

/** Harp üç hereket bilen: üstün, astyn, ötre */
const syllables = computed(() => (letter.value ? letterSyllables(letter.value) : []))
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
        <!-- Giň ekranda öňki/indiki ýokarda — aşak süýşürmezden görünýär -->
        <nav class="hidden items-center gap-2 lg:flex" aria-label="Harplar boýunça geçiş">
          <RouterLink v-if="prev" :to="{ name: 'letter', params: { id: prev.id } }" class="btn-secondary min-h-11">
            <AppIcon name="chevron-left" /> {{ prev.name }}
            <span lang="ar" class="font-arabic text-xl">{{ prev.char }}</span>
          </RouterLink>
          <RouterLink v-if="next" :to="{ name: 'letter', params: { id: next.id } }" class="btn-primary min-h-11">
            <span lang="ar" class="font-arabic text-xl">{{ next.char }}</span> {{ next.name }}
            <AppIcon name="chevron-right" />
          </RouterLink>
          <RouterLink v-else :to="{ name: 'letters-quiz' }" class="btn-gold min-h-11">
            Synag tabşyr <AppIcon name="arrow-right" />
          </RouterLink>
        </nav>
      </template>
    </PageHeader>

    <!-- Mobil: bir sütün; giň ekran: üç sütün, ähli maglumat bir ekranda -->
    <div class="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)_minmax(0,1fr)] lg:items-start">
      <!-- 1. Uly harp -->
      <section class="card relative flex flex-col items-center overflow-hidden p-6 text-center lg:p-5">
        <div class="pointer-events-none absolute inset-x-0 top-0 h-1 bg-linear-to-r from-gold/0 via-gold to-gold/0" />
        <p
          lang="ar"
          class="glyph-safe font-arabic text-[8rem] text-primary sm:text-[10rem] lg:text-[clamp(5rem,15vh,9rem)]"
        >
          {{ letter.char }}
        </p>
        <p class="text-2xl font-bold text-ink">{{ letter.name }}</p>
        <p class="mt-1 text-muted">
          <span lang="ar" class="font-arabic text-xl">{{ letter.arabicName }}</span> · {{ letter.translit }}
        </p>
        <AudioButton
          class="mt-4"
          size="lg"
          :audio-key="`letter-${letter.id}`"
          :request="{ url: audioUrls.letter(letter.id), ttsText: letter.arabicName }"
          label="Adyny diňle"
        />
        <button
          type="button"
          class="mt-4 w-full"
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

      <!-- 2. Bogunlar we ýazylyş görnüşleri -->
      <div class="space-y-4">
        <section class="card p-5">
          <h2 class="text-lg font-bold text-ink">Hereketler bilen okalyşy</h2>
          <p class="mb-3 text-sm text-muted">Her bogna basyp, sesini diňläň we gaýtalaň.</p>
          <div class="grid grid-cols-3 gap-3" dir="rtl">
            <div v-for="s in syllables" :key="s.key" class="flex flex-col items-center rounded-xl bg-surface-2 p-3">
              <p lang="ar" class="glyph-safe font-arabic text-5xl text-ink lg:text-[clamp(2.25rem,5.5vh,3rem)]">{{ s.text }}</p>
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

        <section class="card p-5">
          <h2 class="mb-3 text-lg font-bold text-ink">Ýazylyş görnüşleri</h2>
          <LetterForms :letter="letter" />
        </section>
      </div>

      <!-- 3. Okalyşy we mysal -->
      <div class="space-y-4">
        <section class="card p-5">
          <h2 class="mb-2 text-lg font-bold text-ink">Nähili aýdylýar?</h2>
          <p class="leading-relaxed text-ink/90">{{ letter.pronunciation }}</p>
        </section>

        <section class="card p-5">
          <h2 class="text-sm font-semibold text-muted">Mysal söz</h2>
          <div class="mt-1 flex items-center gap-3">
            <p class="flex-1 text-lg">
              <span class="font-bold text-ink">{{ letter.example.translit }}</span>
              <span class="text-muted"> — {{ letter.example.meaning }}</span>
            </p>
            <p lang="ar" dir="rtl" class="glyph-safe font-arabic text-5xl text-primary">{{ letter.example.arabic }}</p>
            <AudioButton
              :audio-key="`ex-${letter.id}`"
              :request="{ url: audioUrls.exampleSources(`ex-${letter.id}`), ttsText: letter.example.arabic }"
            />
          </div>
        </section>
      </div>
    </div>

    <!-- Mobil / kiçi ekran: öňki / indiki aşakda -->
    <nav class="mt-6 flex items-center justify-between gap-3 lg:hidden" aria-label="Harplar boýunça geçiş">
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
