<script setup lang="ts">
import { computed, watchEffect } from 'vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import AudioButton from '@/components/ui/AudioButton.vue'
import PageHeader from '@/components/ui/PageHeader.vue'
import RichText from '@/components/ui/RichText.vue'
import { RULE_BY_ID, TAJWEED_RULES } from '@/data/tajweed'
import { useTajweedStore } from '@/stores/tajweed'

const props = defineProps<{ id: string }>()
const store = useTajweedStore()

const rule = computed(() => RULE_BY_ID[props.id])
const prev = computed(() => (rule.value ? TAJWEED_RULES[rule.value.order - 2] : undefined))
const next = computed(() => (rule.value ? TAJWEED_RULES[rule.value.order] : undefined))
const stat = computed(() => store.state.stats[props.id])

watchEffect(() => {
  if (rule.value) store.setLastRule(rule.value.id)
})
</script>

<template>
  <div v-if="rule" class="mx-auto max-w-4xl">
    <PageHeader
      :eyebrow="`${rule.order}-nji düzgün · ${TAJWEED_RULES.length}-den`"
      :title="rule.title"
      :subtitle="rule.summary"
      :back="{ name: 'tajweed' }"
    />

    <div class="grid gap-5 md:grid-cols-[minmax(0,1fr)_16rem]">
      <div class="space-y-5">
        <section class="card p-5 sm:p-6">
          <div class="mb-4 flex items-center gap-3">
            <span lang="ar" class="font-arabic text-3xl text-gold">{{ rule.arabicName }}</span>
            <span class="h-6 w-px bg-line" />
            <span class="text-sm text-muted">Belgisi:</span>
            <span lang="ar" class="font-arabic text-3xl text-primary">{{ rule.symbol }}</span>
          </div>
          <div class="space-y-3 leading-relaxed text-ink/90">
            <p v-for="(p, i) in rule.explanation" :key="i"><RichText :text="p" /></p>
          </div>
          <p v-if="rule.tip" class="mt-5 flex items-start gap-2 rounded-xl bg-gold-soft p-4 text-sm font-semibold text-ink">
            <AppIcon name="bookmark" class="mt-0.5 text-gold" :size="18" /> <span><RichText :text="rule.tip" /></span>
          </p>
        </section>

        <section class="card p-5 sm:p-6">
          <h2 class="mb-4 text-lg font-bold text-ink">Mysallar</h2>
          <ul class="grid gap-3 sm:grid-cols-2">
            <li v-for="ex in rule.examples" :key="ex.arabic" class="flex items-center gap-3 rounded-xl bg-surface-2 p-4">
              <AudioButton size="sm" :audio-key="`rule-${rule.id}-${ex.arabic}`" :request="{ ttsText: ex.arabic }" />
              <div class="min-w-0 flex-1">
                <p class="font-bold text-primary">{{ ex.translit }}</p>
                <p v-if="ex.note" class="text-xs text-muted">{{ ex.note }}</p>
              </div>
              <p lang="ar" dir="rtl" class="font-quran text-3xl leading-[1.9] text-ink">{{ ex.arabic }}</p>
            </li>
          </ul>
        </section>
      </div>

      <!-- Gapdal panel -->
      <aside class="space-y-3 md:sticky md:top-24 md:self-start">
        <div class="card p-5">
          <p class="eyebrow mb-2">Tejribe</p>
          <p class="mb-4 text-sm text-muted">{{ rule.questions.length }} soragly gysga synag.</p>
          <RouterLink :to="{ name: 'tajweed-quiz', query: { rules: rule.id } }" class="btn-primary w-full">
            <AppIcon name="quiz" /> Synag tabşyr
          </RouterLink>
          <p v-if="stat?.lastPercent !== undefined" class="mt-3 text-center text-sm text-muted">
            Soňky netije: <b :class="stat.lastPercent >= 75 ? 'text-success' : 'text-danger'">{{ stat.lastPercent }}%</b>
          </p>
        </div>
        <button
          type="button"
          class="w-full"
          :class="store.isStudied(rule.id) ? 'btn border-2 border-primary/40 bg-primary-soft text-primary' : 'btn-gold'"
          @click="store.toggleStudied(rule.id)"
        >
          <AppIcon :name="store.isStudied(rule.id) ? 'check' : 'bookmark'" />
          {{ store.isStudied(rule.id) ? 'Öwrenildi' : 'Öwrendim — bellik et' }}
        </button>
      </aside>
    </div>

    <nav class="mt-6 flex items-center justify-between gap-3" aria-label="Düzgünler boýunça geçiş">
      <RouterLink v-if="prev" :to="{ name: 'rule', params: { id: prev.id } }" class="btn-secondary">
        <AppIcon name="chevron-left" /> {{ prev.title }}
      </RouterLink>
      <span v-else />
      <RouterLink v-if="next" :to="{ name: 'rule', params: { id: next.id } }" class="btn-primary">
        {{ next.title }} <AppIcon name="chevron-right" />
      </RouterLink>
      <RouterLink v-else :to="{ name: 'tajweed-quiz' }" class="btn-gold">
        Umumy synag <AppIcon name="arrow-right" />
      </RouterLink>
    </nav>
  </div>
  <div v-else class="card p-10 text-center">
    <p class="text-muted">Düzgün tapylmady.</p>
    <RouterLink :to="{ name: 'tajweed' }" class="btn-primary mt-4">Düzgünlere gaýt</RouterLink>
  </div>
</template>
