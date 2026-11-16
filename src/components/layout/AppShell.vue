<script setup lang="ts">
import { useRoute } from 'vue-router'
import AppIcon from '@/components/ui/AppIcon.vue'
import AudioNotice from '@/components/ui/AudioNotice.vue'
import SponsorButton from '@/components/ui/SponsorButton.vue'
import { useSettingsStore } from '@/stores/settings'
import { NAV_ITEMS } from './navItems'

const route = useRoute()
const MOBILE_ITEMS = NAV_ITEMS.filter((i) => !i.desktopOnly)
const settings = useSettingsStore()

const isActive = (match: string) => (match === '/' ? route.path === '/' : route.path.startsWith(match))

function toggleTheme() {
  settings.settings.theme = settings.settings.theme === 'dark' ? 'light' : 'dark'
}
</script>

<template>
  <div class="flex min-h-dvh flex-col">
    <!-- Ýokarky panel -->
    <header class="sticky top-0 z-30 border-b border-line/70 bg-bg/85 backdrop-blur-md">
      <div class="mx-auto flex h-16 max-w-6xl items-center gap-4 px-4 sm:px-6">
        <RouterLink to="/" class="flex items-center gap-3" aria-label="Baş sahypa">
          <span
            class="flex size-10 items-center justify-center rounded-xl bg-primary font-arabic text-2xl leading-none text-gold"
            lang="ar"
            aria-hidden="true"
            >ق</span
          >
          <span class="leading-tight">
            <span class="block text-[15px] font-bold text-ink">Kurany öwren</span>
            <span class="hidden text-xs text-muted sm:block">Elipbiý · Tejwid · Okamak · Taryh</span>
          </span>
        </RouterLink>

        <nav class="ml-auto hidden items-center gap-1 xl:flex" aria-label="Esasy menýu">
          <RouterLink
            v-for="item in NAV_ITEMS"
            :key="item.to"
            :to="item.to"
            class="flex h-10 items-center gap-2 rounded-xl px-3 text-sm font-semibold transition-colors"
            :class="isActive(item.match) ? 'bg-primary-soft text-primary' : 'text-muted hover:text-ink'"
          >
            <AppIcon :name="item.icon" :size="18" />
            {{ item.label }}
          </RouterLink>
        </nav>

        <SponsorButton class="ml-auto xl:ml-2" />

        <RouterLink
          to="/sazlamalar"
          class="btn-icon xl:hidden"
          :class="isActive('/sazlamalar') && 'bg-primary-soft text-primary'"
          aria-label="Sazlamalar"
        >
          <AppIcon name="settings" />
        </RouterLink>

        <button
          type="button"
          class="btn-icon"
          :aria-label="settings.settings.theme === 'dark' ? 'Gündiz tertibi' : 'Gije tertibi'"
          @click="toggleTheme"
        >
          <AppIcon :name="settings.settings.theme === 'dark' ? 'sun' : 'moon'" />
        </button>
      </div>
    </header>

    <main class="mx-auto w-full max-w-6xl flex-1 px-4 pt-6 pb-28 sm:px-6 xl:pb-12">
      <slot />
    </main>

    <AudioNotice />

    <!-- Mobil aşaky menýu -->
    <nav
      class="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-surface/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md xl:hidden"
      aria-label="Esasy menýu"
    >
      <div class="grid grid-cols-5">
        <RouterLink
          v-for="item in MOBILE_ITEMS"
          :key="item.to"
          :to="item.to"
          class="flex h-16 flex-col items-center justify-center gap-1 text-[11px] font-semibold transition-colors"
          :class="isActive(item.match) ? 'text-primary' : 'text-muted'"
        >
          <span
            class="flex h-7 w-12 items-center justify-center rounded-full transition-colors"
            :class="isActive(item.match) && 'bg-primary-soft'"
          >
            <AppIcon :name="item.icon" :size="20" />
          </span>
          {{ item.label }}
        </RouterLink>
      </div>
    </nav>
  </div>
</template>
