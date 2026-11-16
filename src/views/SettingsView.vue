<script setup lang="ts">
import { ref } from 'vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import PageHeader from '@/components/ui/PageHeader.vue'
import SponsorButton from '@/components/ui/SponsorButton.vue'
import { RECITERS } from '@/config'
import { useAudio } from '@/services/audio'
import { storage } from '@/services/storage'
import { useSettingsStore } from '@/stores/settings'

const store = useSettingsStore()
const s = store.settings
const audio = useAudio()
const message = ref<{ text: string; ok: boolean } | null>(null)

const toggles = [
  { key: 'showTranslation', label: 'Aýatyň manysyny görkez', hint: 'Okaýjyda aşaky ýarymda türkmençe terjime' },
  { key: 'showTranslit', label: 'Transliterasiýany görkez', hint: 'Harp kartlarynda latyn harplary bilen okalyşy' },
  {
    key: 'autoAddMistakes',
    label: 'Ýalňyşlary awtomatiki gaýtalama goş',
    hint: 'Synagda ýalňyşlan harplar “Gaýtalamaly” sanawyna düşer',
  },
  {
    key: 'resumeOnLaunch',
    label: 'Galan ýerimden dowam et',
    hint: 'Programma açylanda soňky açylan sahypa awtomatiki geçmek',
  },
] as const

/** Öňe gidişi JSON faýl görnüşinde göçürip almak (enjam çalşanda ýitmez ýaly) */
function exportProgress() {
  const blob = new Blob([JSON.stringify(storage.exportAll(), null, 2)], { type: 'application/json' })
  const a = document.createElement('a')
  a.href = URL.createObjectURL(blob)
  a.download = `kuran-owren-${new Date().toISOString().slice(0, 10)}.json`
  a.click()
  URL.revokeObjectURL(a.href)
}

async function importProgress(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) return
  try {
    const data = JSON.parse(await file.text())
    if (typeof data !== 'object' || data === null || Array.isArray(data)) throw new Error('format')
    storage.importAll(data)
    message.value = { text: 'Maglumatlar dikeldildi. Sahypa täzelenýär…', ok: true }
    setTimeout(() => location.reload(), 900)
  } catch {
    message.value = { text: 'Faýly okap bolmady. Dogry eksport faýlyny saýlaň.', ok: false }
  }
}

function resetAll() {
  if (!window.confirm('Ähli öňe gidişiňiz (harplar, synaglar, okalan aýatlar) pozular. Dowam edilsinmi?')) return
  storage.clearAll()
  location.reload()
}
</script>

<template>
  <div class="mx-auto max-w-2xl">
    <PageHeader title="Sazlamalar" subtitle="Okamak tertibini özüňize amatly ediň." />

    <div class="space-y-5">
      <!-- Görnüş -->
      <section class="card p-5 sm:p-6">
        <h2 class="mb-4 text-lg font-bold text-ink">Görnüş</h2>

        <div class="mb-5 grid grid-cols-2 gap-2">
          <button
            v-for="t in [
              { v: 'light', label: 'Gündiz', icon: 'sun' },
              { v: 'dark', label: 'Gije', icon: 'moon' },
            ] as const"
            :key="t.v"
            type="button"
            class="btn border-2"
            :class="s.theme === t.v ? 'border-primary bg-primary-soft text-primary' : 'border-line text-ink'"
            :aria-pressed="s.theme === t.v"
            @click="s.theme = t.v"
          >
            <AppIcon :name="t.icon" /> {{ t.label }}
          </button>
        </div>

        <label for="font-size" class="flex items-baseline justify-between font-semibold text-ink">
          Aýat harpynyň ölçegi <span class="text-sm text-muted">{{ s.arabicFontSize }}px</span>
        </label>
        <input
          id="font-size"
          v-model.number="s.arabicFontSize"
          type="range"
          min="26"
          max="72"
          step="2"
          class="mt-3 w-full accent-(--c-primary)"
        />
        <p lang="ar" dir="rtl" class="quran-text mt-3 rounded-xl bg-surface-2 py-2 text-center text-ink">
          ٱلۡحَمۡدُ لِلَّهِ رَبِّ ٱلۡعَٰلَمِينَ
        </p>
      </section>

      <!-- Ses -->
      <section class="card p-5 sm:p-6">
        <h2 class="mb-4 text-lg font-bold text-ink">Ses</h2>
        <label for="reciter" class="font-semibold text-ink">Aýatlary okaýan kary</label>
        <select
          id="reciter"
          v-model="s.reciter"
          class="mt-2 h-12 w-full rounded-xl border border-line bg-surface px-3 text-ink"
        >
          <option v-for="r in RECITERS" :key="r.id" :value="r.id">{{ r.name }}</option>
        </select>

        <p class="mt-5 font-semibold text-ink">Ses tizligi</p>
        <div class="mt-2 grid grid-cols-3 gap-2">
          <button
            v-for="r in [
              { v: 0.75, label: 'Haýal' },
              { v: 1, label: 'Adaty' },
              { v: 1.25, label: 'Çalt' },
            ]"
            :key="r.v"
            type="button"
            class="btn min-h-11 border-2"
            :class="s.playbackRate === r.v ? 'border-primary bg-primary-soft text-primary' : 'border-line text-ink'"
            @click="s.playbackRate = r.v"
          >
            {{ r.label }}
          </button>
        </div>

        <p
          class="mt-5 flex items-start gap-2 rounded-xl p-3 text-sm"
          :class="audio.arabicVoice.value ? 'bg-success-soft text-success' : 'bg-gold-soft text-ink'"
        >
          <AppIcon :name="audio.arabicVoice.value ? 'check' : 'alert'" :size="18" class="mt-0.5" />
          <span v-if="audio.arabicVoice.value">
            Enjamyňyzda arapça ses bar ({{ audio.arabicVoice.value.name }}). Onlaýn ýazgy elýeterli bolmasa, şu ses
            ulanylar.
          </span>
          <span v-else>
            Enjamyňyzda arapça TTS sesi tapylmady. Aýat we söz sesleri internet arkaly ýüklenýär; harplaryň sesi üçin
            enjamyňyzyň sazlamalaryndan arap dilini (Text-to-Speech) goşuň.
          </span>
        </p>
      </section>

      <!-- Okuw -->
      <section class="card divide-y divide-line px-5 sm:px-6">
        <label v-for="t in toggles" :key="t.key" class="flex cursor-pointer items-center gap-4 py-4">
          <span class="flex-1">
            <span class="block font-semibold text-ink">{{ t.label }}</span>
            <span class="block text-sm text-muted">{{ t.hint }}</span>
          </span>
          <input v-model="s[t.key]" type="checkbox" class="peer sr-only" />
          <span
            class="relative h-7 w-12 shrink-0 rounded-full bg-line transition-colors peer-checked:bg-primary peer-focus-visible:outline-2 peer-focus-visible:outline-gold after:absolute after:top-1 after:left-1 after:size-5 after:rounded-full after:bg-white after:shadow after:transition-transform peer-checked:after:translate-x-5"
            aria-hidden="true"
          />
        </label>
      </section>

      <!-- Maglumatlar -->
      <section class="card p-5 sm:p-6">
        <h2 class="mb-1 text-lg font-bold text-ink">Öňe gidişiňiz</h2>
        <p class="mb-4 text-sm text-muted">
          Ähli maglumatlar diňe şu enjamda (brauzeriň LocalStorage-ynda) saklanýar. Başga enjama geçmek üçin göçürip
          alyň.
        </p>
        <div class="grid gap-2 sm:grid-cols-2">
          <button type="button" class="btn-secondary" @click="exportProgress">
            <AppIcon name="download" /> Göçürip al (JSON)
          </button>
          <label class="btn-secondary cursor-pointer">
            <AppIcon name="upload" /> Faýldan dikelt
            <input type="file" accept="application/json,.json" class="sr-only" @change="importProgress" />
          </label>
        </div>
        <p
          v-if="message"
          class="mt-3 rounded-xl p-3 text-sm"
          :class="message.ok ? 'bg-success-soft text-success' : 'bg-danger-soft text-danger'"
          role="status"
        >
          {{ message.text }}
        </p>
        <button type="button" class="btn-ghost mt-4 w-full text-danger hover:bg-danger-soft" @click="resetAll">
          <AppIcon name="trash" /> Ähli maglumatlary poz
        </button>
      </section>

      <SponsorButton variant="card" />
    </div>
  </div>
</template>
