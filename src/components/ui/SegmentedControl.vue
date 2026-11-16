<script setup lang="ts" generic="T extends string">
defineProps<{ options: { value: T; label: string; count?: number }[]; label: string }>()
const model = defineModel<T>({ required: true })
</script>

<template>
  <div role="tablist" :aria-label="label" class="flex gap-1 overflow-x-auto rounded-2xl bg-surface-2 p-1">
    <button
      v-for="o in options"
      :key="o.value"
      role="tab"
      type="button"
      :aria-selected="model === o.value"
      class="flex min-h-10 flex-1 items-center justify-center gap-1.5 rounded-xl px-3 text-sm font-semibold whitespace-nowrap transition-colors"
      :class="model === o.value ? 'bg-surface text-primary shadow-sm' : 'text-muted hover:text-ink'"
      @click="model = o.value"
    >
      {{ o.label }}
      <span
        v-if="o.count !== undefined"
        class="chip px-1.5"
        :class="model === o.value ? 'bg-primary-soft text-primary' : 'bg-surface text-muted'"
      >
        {{ o.count }}
      </span>
    </button>
  </div>
</template>
