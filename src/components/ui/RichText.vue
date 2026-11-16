<script setup lang="ts">
import { computed } from 'vue'

/**
 * Türkmençe tekstiň içindäki arapça bölekleri awtomatiki tapyp,
 * arap şriftinde we <bdi> bilen (sagdan-çepe ugur bulaşmaz ýaly) görkezýär.
 */
const props = defineProps<{ text: string }>()

// Arap harplary / belgileri bilen başlap gutarýan yzygiderlik (aralarynda boşluk bolup biler)
const ARABIC_RUN = /([؀-ۿݐ-ݿࢠ-ࣿﭐ-﷿ﹰ-﻿](?:[؀-ۿݐ-ݿࢠ-ࣿﭐ-﷿ﹰ-﻿\s]*[؀-ۿݐ-ݿࢠ-ࣿﭐ-﷿ﹰ-﻿])?)/u

// split() ýakalaýjy topar bilen: täk indeksler — arapça bölekler
const parts = computed(() =>
  props.text
    .split(ARABIC_RUN)
    .map((t, i) => ({ t, ar: i % 2 === 1 }))
    .filter((p) => p.t),
)
</script>

<template>
  <template v-for="(p, i) in parts" :key="i">
    <bdi v-if="p.ar" lang="ar" dir="rtl" class="font-quran text-[1.35em] leading-none">{{ p.t }}</bdi>
    <template v-else>{{ p.t }}</template>
  </template>
</template>
