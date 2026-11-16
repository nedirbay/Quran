<script setup lang="ts">
import { useAudio } from '@/services/audio'
import AppIcon from './AppIcon.vue'

/** Ses çykmadyk ýagdaýynda ulanyja düşnükli duýduryş we çözgüt */
const audio = useAudio()
</script>

<template>
  <Transition name="page">
    <div
      v-if="audio.notice.value === 'no-arabic-voice'"
      role="alert"
      class="fixed inset-x-3 bottom-20 z-40 mx-auto max-w-lg rounded-2xl border border-gold/50 bg-surface p-4 shadow-xl xl:bottom-6"
    >
      <div class="flex items-start gap-3">
        <span class="flex size-9 shrink-0 items-center justify-center rounded-full bg-gold-soft text-gold">
          <AppIcon name="volume" :size="18" />
        </span>
        <div class="flex-1 text-sm">
          <p class="font-bold text-ink">Ses çykaryp bolmady</p>
          <p class="mt-1 text-muted">
            Harplaryň sesi üçin brauzeriňizde arapça okaýjy ses (TTS) ýok. Iň aňsat çözgüt — programmany
            <b class="text-ink">Microsoft Edge</b> brauzerinde açmak: onda arapça sesler bar.
          </p>
          <RouterLink
            :to="{ name: 'settings', hash: '#ses' }"
            class="mt-2 inline-block font-semibold text-primary underline"
            @click="audio.dismissNotice()"
          >
            Başga çözgütler
          </RouterLink>
        </div>
        <button type="button" class="btn-icon -mt-1 -mr-1 size-9" aria-label="Ýap" @click="audio.dismissNotice()">
          <AppIcon name="x" :size="18" />
        </button>
      </div>
    </div>
  </Transition>
</template>
