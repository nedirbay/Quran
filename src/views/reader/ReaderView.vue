<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, shallowRef, watch } from 'vue'
import { useRouter } from 'vue-router'
import AyahPicker from '@/components/reader/AyahPicker.vue'
import AyahText from '@/components/reader/AyahText.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import AudioButton from '@/components/ui/AudioButton.vue'
import ProgressBar from '@/components/ui/ProgressBar.vue'
import { audioUrls } from '@/config'
import { useAudio } from '@/services/audio'
import { BASMALA, getSurah, hasBasmalaHeader, neighbourSurah } from '@/services/quran'
import { useReaderStore } from '@/stores/reader'
import { useSettingsStore } from '@/stores/settings'
import type { Surah } from '@/types'
import { toTtsText } from '@/utils/arabic'

const props = defineProps<{ surahId: number; ayah?: number }>()

const router = useRouter()
const reader = useReaderStore()
const settings = useSettingsStore()
const audio = useAudio()

const surah = shallowRef<Surah | null>(null)
const loading = ref(true)
const showPicker = ref(false)

/* --------------------------- Maglumat ýüklemek --------------------------- */

watch(
  () => props.surahId,
  async (id) => {
    loading.value = true
    surah.value = await getSurah(id)
    loading.value = false
    if (surah.value && props.ayah === undefined) {
      // Aýat görkezilmedik bolsa: soňky okan ýerim → ilkinji okalmadyk aýat → 1
      const last = reader.state.last
      const firstUnread = surah.value.ayahs.find((a) => !reader.isRead(id, a.number))?.number
      const target = last?.surahId === id ? last.ayah : (firstUnread ?? 1)
      router.replace({ name: 'reader', params: { surah: id, ayah: target } })
    }
  },
  { immediate: true },
)

const current = computed(() => {
  if (!surah.value) return null
  const n = Math.min(Math.max(props.ayah ?? 1, 1), surah.value.totalAyahs)
  return surah.value.ayahs[n - 1] ?? null
})

const isLast = computed(() => !!surah.value && current.value?.number === surah.value.totalAyahs)
const nextSurah = computed(() => neighbourSurah(props.surahId, 1))
const prevSurah = computed(() => neighbourSurah(props.surahId, -1))
const surahProgress = computed(() => reader.surahProgress(props.surahId))
/** Soňky aýat okaldy — süräniň ahyryna ýetildi */
const completed = computed(
  () => isLast.value && !!current.value && reader.isRead(props.surahId, current.value.number),
)
const unreadCount = computed(() => surahProgress.value.total - surahProgress.value.read)

/* -------------------- Ýagdaýy ýatda saklamak (state) --------------------- */

// Her aýat açylanda soňky okalan ýer hökmünde ýazylýar
watch(
  current,
  (a) => {
    if (a && surah.value) reader.setPosition(surah.value.id, a.number)
    audio.stop()
  },
  { immediate: true },
)

/* ------------------------------- Geçişler -------------------------------- */

function goTo(surahId: number, ayah: number) {
  router.replace({ name: 'reader', params: { surah: surahId, ayah } })
}

function next() {
  if (!surah.value || !current.value) return
  // “Öňe” — aýat okaldy diýip hasaplanýar
  reader.markRead(surah.value.id, current.value.number)
  if (!isLast.value) goTo(surah.value.id, current.value.number + 1)
}

function prev() {
  if (!surah.value || !current.value) return
  if (current.value.number > 1) goTo(surah.value.id, current.value.number - 1)
  else if (prevSurah.value) goTo(prevSurah.value.id, prevSurah.value.totalAyahs)
}

function openNextSurah() {
  if (nextSurah.value) goTo(nextSurah.value.id, 1)
  else router.push({ name: 'surahs' })
}

function toggleRead() {
  if (!surah.value || !current.value) return
  const { id } = surah.value
  const n = current.value.number
  if (reader.isRead(id, n)) reader.unmarkRead(id, n)
  else reader.markRead(id, n)
}

function changeFont(delta: number) {
  const s = settings.settings
  s.arabicFontSize = Math.min(72, Math.max(26, s.arabicFontSize + delta))
}

/* -------------------- Klawiatura we barmak hereketi --------------------- */

function onKey(e: KeyboardEvent) {
  if ((e.target as HTMLElement)?.closest('input, textarea, select')) return
  if (e.key === 'ArrowRight') next()
  else if (e.key === 'ArrowLeft') prev()
}

let touchX = 0
let touchY = 0
function onTouchStart(e: TouchEvent) {
  touchX = e.touches[0]!.clientX
  touchY = e.touches[0]!.clientY
}
function onTouchEnd(e: TouchEvent) {
  const dx = e.changedTouches[0]!.clientX - touchX
  const dy = e.changedTouches[0]!.clientY - touchY
  if (Math.abs(dx) < 70 || Math.abs(dy) > Math.abs(dx)) return
  if (dx < 0) next()
  else prev()
}

onMounted(() => window.addEventListener('keydown', onKey))
onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKey)
  audio.stop()
})
</script>

<template>
  <div v-if="loading" class="flex justify-center py-24 text-muted">Ýüklenýär…</div>

  <div v-else-if="!surah" class="card p-10 text-center">
    <p class="text-muted">Süre tapylmady.</p>
    <RouterLink :to="{ name: 'surahs' }" class="btn-primary mt-4">Sürelere gaýt</RouterLink>
  </div>

  <div v-else-if="current" class="mx-auto max-w-4xl">
    <!-- Ýokarky maglumat paneli -->
    <header class="mb-4 flex items-center gap-2">
      <RouterLink :to="{ name: 'surahs' }" class="btn-icon -ml-2" aria-label="Süreler">
        <AppIcon name="chevron-left" :size="22" />
      </RouterLink>
      <div class="min-w-0 flex-1">
        <h1 class="truncate text-lg font-bold text-ink">
          {{ surah.id }}. {{ surah.nameTurkmen }}<span class="hidden sm:inline"> süresi</span>
          <span lang="ar" class="ml-1 font-quran text-xl font-normal text-gold">{{ surah.nameArabic }}</span>
        </h1>
        <div class="mt-1 flex items-center gap-3">
          <ProgressBar class="max-w-48" :value="surahProgress.percent" label="Süräniň okalan bölegi" />
          <span class="shrink-0 text-xs text-muted">{{ surahProgress.read }}/{{ surahProgress.total }} okaldy</span>
        </div>
      </div>
      <button type="button" class="btn-icon" aria-label="Harpy kiçelt" @click="changeFont(-4)">
        <span class="text-sm font-bold">A−</span>
      </button>
      <button type="button" class="btn-icon" aria-label="Harpy ulalt" @click="changeFont(4)">
        <span class="text-lg font-bold">A+</span>
      </button>
      <button
        type="button"
        class="btn-icon"
        :class="showPicker && 'bg-primary-soft text-primary'"
        aria-label="Aýatlaryň sanawy"
        :aria-expanded="showPicker"
        @click="showPicker = !showPicker"
      >
        <AppIcon name="grid" />
      </button>
    </header>

    <Transition name="page">
      <div v-if="showPicker" class="card mb-4 p-4 sm:p-5">
        <AyahPicker
          :surah-id="surah.id"
          :total="surah.totalAyahs"
          :current="current.number"
          @select="(n) => (goTo(surah!.id, n), (showPicker = false))"
        />
      </div>
    </Transition>

    <!-- Bölünen ekran: ýokarda arapça, aşakda türkmençe -->
    <article
      class="card flex min-h-[calc(100dvh-20rem)] flex-col overflow-hidden md:min-h-[calc(100dvh-14rem)]"
      @touchstart.passive="onTouchStart"
      @touchend.passive="onTouchEnd"
    >
      <!-- Ýokarky ýarym: aýat -->
      <section class="flex flex-[3] flex-col justify-center px-4 py-8 sm:px-10" aria-label="Arapça aýat">
        <p v-if="current.number === 1 && hasBasmalaHeader(surah.id)" lang="ar" class="mb-4 text-center font-quran text-2xl text-muted">
          {{ BASMALA }}
        </p>
        <AyahText :key="`${surah.id}:${current.number}`" :surah-id="surah.id" :ayah="current" />
        <p class="mt-4 text-center text-xs text-muted">Islendik sözüň üstüne basyp, okalyşyny diňläň</p>
      </section>

      <div class="ornament-divider px-6" aria-hidden="true">
        <span class="text-sm">۞</span>
      </div>

      <!-- Aşaky ýarym: terjime -->
      <section
        v-if="settings.settings.showTranslation"
        class="flex flex-[2] flex-col justify-center bg-surface-2/50 px-5 py-6 sm:px-10"
        aria-label="Türkmençe manysy"
      >
        <p class="eyebrow mb-2 text-center">Manysy</p>
        <p class="mx-auto max-w-2xl text-center text-lg leading-relaxed text-ink sm:text-xl">
          <span class="mr-1 font-semibold text-gold">{{ current.number }}.</span>{{ current.turkmen }}
        </p>
      </section>
    </article>

    <!-- Süre tamamlandy -->
    <div v-if="completed" class="card mt-4 flex flex-col items-center gap-3 border-gold/50 bg-gold-soft p-5 text-center sm:flex-row sm:text-left">
      <AppIcon name="check" :size="28" class="text-gold" />
      <p class="flex-1 font-semibold text-ink">
        <template v-if="!unreadCount">{{ surah.nameTurkmen }} süresi doly okaldy. Allah kabul etsin!</template>
        <template v-else>
          Süräniň ahyryna ýetdiňiz. Entek {{ unreadCount }} aýat okalmadyk —
          <button type="button" class="text-primary underline" @click="showPicker = true">sanawa serediň</button>.
        </template>
      </p>
      <button type="button" class="btn-primary" @click="openNextSurah">
        {{ nextSurah ? `${nextSurah.nameTurkmen} süresi` : 'Süreler' }} <AppIcon name="arrow-right" />
      </button>
    </div>

    <!-- Dolandyryş paneli -->
    <nav
      class="sticky bottom-20 z-20 mt-4 flex items-center gap-2 rounded-2xl border border-line bg-surface/95 p-2 shadow-lg backdrop-blur md:bottom-4"
      aria-label="Aýatlar boýunça geçiş"
    >
      <button
        type="button"
        class="btn-secondary flex-1 sm:flex-none"
        :disabled="current.number === 1 && !prevSurah"
        @click="prev"
      >
        <AppIcon name="chevron-left" /> <span class="hidden sm:inline">Yza</span>
      </button>

      <div class="flex flex-1 items-center justify-center gap-2">
        <AudioButton
          :audio-key="`ayah-${surah.id}-${current.number}`"
          :request="{
            url: audioUrls.ayah(settings.settings.reciter, surah.id, current.number),
            ttsText: toTtsText(current.arabic),
          }"
          label="Diňle"
        />
        <button
          type="button"
          class="btn-icon"
          :class="reader.isRead(surah.id, current.number) ? 'bg-primary text-on-primary hover:bg-primary-strong' : 'text-muted'"
          :aria-pressed="reader.isRead(surah.id, current.number)"
          :title="reader.isRead(surah.id, current.number) ? 'Okaldy (belligi aýyr)' : 'Okaldy diýip bellik et'"
          @click="toggleRead"
        >
          <AppIcon name="check" />
        </button>
        <span class="hidden text-sm font-semibold text-muted sm:inline">{{ current.number }} / {{ surah.totalAyahs }}</span>
      </div>

      <button v-if="!isLast" type="button" class="btn-primary flex-1 sm:flex-none" @click="next">
        <span class="hidden sm:inline">Öňe</span> <AppIcon name="chevron-right" />
      </button>
      <button
        v-else-if="!completed"
        type="button"
        class="btn-gold flex-1 sm:flex-none"
        @click="next"
      >
        Tamamla <AppIcon name="check" />
      </button>
      <button v-else type="button" class="btn-primary flex-1 sm:flex-none" @click="openNextSurah">
        <span class="hidden sm:inline">Indiki süre</span> <AppIcon name="chevron-right" />
      </button>
    </nav>
  </div>
</template>
