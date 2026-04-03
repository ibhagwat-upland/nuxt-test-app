<script setup lang="ts">
import { countText } from '~/utils/textCounter'
import type { TextStats } from '~/utils/textCounter'

const input = ref('')

const stats = computed<TextStats>(() => {
  return countText(input.value)
})

const statItems = computed(() => [
  { label: 'Characters', value: stats.value.characters, color: 'blue' },
  { label: 'Characters (no spaces)', value: stats.value.charactersNoSpaces, color: 'cyan' },
  { label: 'Words', value: stats.value.words, color: 'green' },
  { label: 'Lines', value: stats.value.lines, color: 'purple' },
  { label: 'Sentences', value: stats.value.sentences, color: 'orange' },
  { label: 'Paragraphs', value: stats.value.paragraphs, color: 'pink' }
])
</script>

<template>
  <div class="space-y-6">
    <UCard>
      <template #header>
        <div>
          <h2 class="text-lg font-semibold">Text Counter</h2>
          <p class="text-sm text-muted">Count characters, words, lines, and more</p>
        </div>
      </template>

      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium mb-1.5">Input Text</label>
          <UTextarea
            v-model="input"
            placeholder="Paste or type your text here..."
            :rows="8"
            autoresize
          />
        </div>

        <div>
          <label class="block text-sm font-medium mb-3">Statistics</label>
          <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div
              v-for="stat in statItems"
              :key="stat.label"
              class="p-4 rounded-lg border border-default bg-subtle"
            >
              <div class="text-sm text-muted mb-1">{{ stat.label }}</div>
              <div class="text-2xl font-bold">{{ stat.value.toLocaleString() }}</div>
            </div>
          </div>
        </div>
      </div>
    </UCard>
  </div>
</template>
