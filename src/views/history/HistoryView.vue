<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AppIcon from '@/components/ui/AppIcon.vue'
import PageHeader from '@/components/ui/PageHeader.vue'
import ProgressBar from '@/components/ui/ProgressBar.vue'
import RichText from '@/components/ui/RichText.vue'
import SegmentedControl from '@/components/ui/SegmentedControl.vue'
import { BOOKS } from '@/data/books'
import { PROPHET_BY_ID, PROPHETS } from '@/data/prophets'
import { useStoriesStore } from '@/stores/stories'
import { honorific, storyLabel, storyRoute } from '@/utils/history'

type Tab = 'books' | 'prophets'
type ProphetFilter = 'all' | 'ululAzm' | 'unread'

const route = useRoute()
const router = useRouter()
const store = useStoriesStore()

// Saýlanan bölüm URL-da saklanýar — yza gaýdanda ýitmez ýaly
const tab = computed<Tab>({
  get: () => (route.query.tab === 'books' ? 'books' : 'prophets'),
  set: (v) => router.replace({ query: { ...route.query, tab: v } }),
})
const filter = computed<ProphetFilter>({
  get: () => (['ululAzm', 'unread'].includes(route.query.f as string) ? (route.query.f as ProphetFilter) : 'all'),
  set: (v) => router.replace({ query: { ...route.query, f: v } }),
})

const tabs = computed(() => [
  { value: 'prophets' as const, label: 'Pygamberler', count: PROPHETS.length },
  { value: 'books' as const, label: 'Kitaplar', count: BOOKS.length },
])
const filters = computed(() => [
  { value: 'all' as const, label: 'Hemmesi' },
  { value: 'ululAzm' as const, label: 'Ulul-azm', count: PROPHETS.filter((p) => p.ululAzm).length },
  { value: 'unread' as const, label: 'Okalmadyk', count: PROPHETS.filter((p) => !store.isRead(p.id)).length },
])

const prophets = computed(() =>
  PROPHETS.filter((p) =>
    filter.value === 'ululAzm' ? p.ululAzm : filter.value === 'unread' ? !store.isRead(p.id) : true,
  ),
)
const last = computed(() => store.state.lastId)
</script>

<template>
  <div>
    <PageHeader
      eyebrow="4-nji bölüm"
      title="Kitaplar we pygamberler"
      subtitle="Ylahy kitaplaryň taryhy we Kuranda ady geçýän 25 pygamberiň başdan geçirmeleri."
    />

    <div class="mb-6 grid gap-4 lg:grid-cols-[1fr_20rem]">
      <!-- Giriş -->
      <section class="card p-5 sm:p-6">
        <p class="eyebrow mb-2">Imanyň şertlerinden</p>
        <p class="leading-relaxed text-ink/90">
          Musulman Allahyň iberen ähli kitaplaryna we ähli pygamberlerine iman edýär we olaryň arasynda tapawut
          goýmaýar (2:285). Kuranda 25 pygamberiň ady agzalýar, ýöne Allah olardan başga-da köp pygamber iberipdir:
          “Olaryň käbiriniň kyssasyny saňa beýan etdik, käbiriniňkini beýan etmedik” (40:78).
        </p>
        <p class="mt-3 text-sm text-muted">
          <b class="text-ink">(a.s.)</b> — “alaýhyssalam”, ýagny “oňa salam bolsun”;
          <b lang="ar" class="font-quran text-base text-ink">ﷺ</b> — “sallallahu alaýhi we sellem”, Muhammet pygamberiň adyndan soň aýdylýar.
        </p>
      </section>

      <!-- Öňe gidiş -->
      <section class="card flex flex-col gap-3 p-5">
        <div class="flex items-baseline justify-between">
          <p class="font-semibold text-ink">Okalanlar</p>
          <p class="text-sm text-muted">
            <span class="text-lg font-bold text-primary">{{ store.progress.read }}</span> / {{ store.progress.total }}
          </p>
        </div>
        <ProgressBar :value="store.progress.percent" label="Okalan kyssalar" />
        <p v-if="last" class="text-sm text-muted">
          Soňky açylan:
          <RouterLink :to="storyRoute(last)" class="font-semibold text-primary"><RichText :text="storyLabel(last)" /></RouterLink>
        </p>
        <div class="mt-auto grid gap-2">
          <RouterLink :to="{ name: 'history-quiz', query: { scope: tab } }" class="btn-primary">
            <AppIcon name="quiz" /> {{ tab === 'books' ? 'Kitaplar' : 'Pygamberler' }} boýunça synag
          </RouterLink>
          <RouterLink v-if="store.weakIds.length" :to="{ name: 'history-quiz', query: { scope: 'weak' } }" class="btn-secondary">
            <AppIcon name="target" /> Ýalňyşlarym boýunça
          </RouterLink>
        </div>
      </section>
    </div>

    <SegmentedControl v-model="tab" :options="tabs" label="Bölümi saýlaň" class="mb-5" />

    <!-- Kitaplar: taryhy yzygiderlik -->
    <ol v-if="tab === 'books'" class="relative space-y-4 border-l-2 border-gold/30 pl-6 sm:ml-4">
      <li v-for="b in BOOKS" :key="b.id" class="relative">
        <span
          class="absolute top-6 -left-[2.05rem] flex size-4 items-center justify-center rounded-full border-2 border-gold bg-bg"
          :class="store.isRead(b.id) && 'bg-gold'"
          aria-hidden="true"
        />
        <RouterLink
          :to="{ name: 'book', params: { id: b.id } }"
          class="card group flex flex-col gap-4 p-5 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md sm:flex-row sm:items-center"
        >
          <span
            lang="ar"
            class="w-40 shrink-0 text-center font-quran leading-[1.8] whitespace-nowrap text-primary sm:text-right"
            :class="b.arabicName.length > 10 ? 'text-3xl' : 'text-4xl'"
            >{{ b.arabicName }}</span
          >
          <span class="min-w-0 flex-1">
            <span class="flex flex-wrap items-center gap-2">
              <span class="text-lg font-bold text-ink">{{ b.name }}</span>
              <span v-if="store.isRead(b.id)" class="chip bg-success-soft text-success"><AppIcon name="check" :size="12" /> Okaldy</span>
            </span>
            <span class="mt-0.5 block text-sm font-semibold text-gold">
              <RichText :text="b.prophetIds.map((id) => `${PROPHET_BY_ID[id]!.name} ${honorific(PROPHET_BY_ID[id]!)}`).join(', ')" />
              · {{ b.period }}
            </span>
            <span class="mt-1.5 block text-sm leading-relaxed text-muted"><RichText :text="b.summary" /></span>
          </span>
          <AppIcon name="chevron-right" class="hidden text-muted transition-transform group-hover:translate-x-0.5 sm:block" />
        </RouterLink>
      </li>
    </ol>

    <!-- Pygamberler -->
    <template v-else>
      <div class="mb-4 flex flex-wrap items-center justify-between gap-3">
        <SegmentedControl v-model="filter" :options="filters" label="Pygamberleri süzmek" class="w-full sm:w-auto" />
        <p class="text-xs text-muted">Tertip takmynan taryhy yzygiderlige görä</p>
      </div>
      <ol class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <li v-for="p in prophets" :key="p.id">
          <RouterLink
            :to="{ name: 'prophet', params: { id: p.id } }"
            class="card group flex h-full items-center gap-4 p-4 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
            :class="store.isRead(p.id) && 'border-primary/30'"
          >
            <span
              class="relative flex h-16 w-20 shrink-0 items-center justify-center rounded-xl font-quran leading-none whitespace-nowrap"
              :class="[p.ululAzm ? 'bg-primary text-gold' : 'bg-primary-soft text-primary', p.arabicName.length > 8 ? 'text-lg' : 'text-[1.7rem]']"
              lang="ar"
            >
              {{ p.arabicName }}
              <span class="absolute -top-2 -left-2 flex size-6 items-center justify-center rounded-full border border-line bg-surface text-[11px] font-bold text-muted">
                {{ p.order }}
              </span>
            </span>
            <span class="min-w-0 flex-1">
              <span class="flex items-center gap-1.5">
                <span class="truncate font-bold text-ink">{{ p.name }}</span>
                <span class="shrink-0 text-xs text-muted"><RichText :text="honorific(p)" /></span>
                <AppIcon v-if="store.isRead(p.id)" name="check" :size="14" class="shrink-0 text-success" />
              </span>
              <span class="mt-0.5 line-clamp-2 block text-sm text-muted">{{ p.title }}</span>
              <span v-if="p.ululAzm" class="chip mt-1.5 bg-gold-soft text-gold">Ulul-azm</span>
            </span>
          </RouterLink>
        </li>
      </ol>
      <p v-if="!prophets.length" class="card p-8 text-center text-muted">Ähli pygamberleriň kyssalaryny okadyňyz — maşalla!</p>
      <p v-if="filter === 'ululAzm'" class="mt-4 text-sm text-muted">
        <b class="text-ink">Ulul-azm</b> — “berk kararly” pygamberler: Nuh, Ybraýym, Musa, Isa we Muhammet. Olar Kuranda
        aýratyn agzalýar (33:7; 42:13; 46:35).
      </p>
    </template>
  </div>
</template>
