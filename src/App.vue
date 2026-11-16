<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import AppShell from '@/components/layout/AppShell.vue'
import { useSettingsStore } from '@/stores/settings'

const router = useRouter()
const settings = useSettingsStore()
// Başlangyç nawigasiýa tamamlanmazdan öň okaýarys (afterEach ony üýtgedip biler)
const resumeTarget = settings.lastRoute

/**
 * “Galan ýerimden dowam et”:
 * - her “resumable” sahypa açylanda onuň ýoly ýatda saklanýar;
 * - programma baş sahypadan açylsa we sazlama açyk bolsa — soňky ýere geçilýär.
 */
router.afterEach((to) => {
  if (to.name === 'home') settings.lastRoute = null
  else if (to.meta.resumable) settings.lastRoute = to.fullPath
})

onMounted(async () => {
  await router.isReady()
  if (settings.settings.resumeOnLaunch && resumeTarget && router.currentRoute.value.name === 'home') {
    router.replace(resumeTarget).catch(() => {})
  }
})
</script>

<template>
  <AppShell>
    <RouterView v-slot="{ Component, route }">
      <Transition name="page" mode="out-in">
        <component :is="Component" :key="route.name === 'reader' ? 'reader' : route.fullPath" />
      </Transition>
    </RouterView>
  </AppShell>
</template>
