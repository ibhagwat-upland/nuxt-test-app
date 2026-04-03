<script setup lang="ts">
import {
  toUpperCase,
  toLowerCase,
  toTitleCase,
  toCamelCase,
  toSnakeCase,
  toKebabCase
} from '~/utils/caseConverter'

const input = ref('')
const activeMode = ref('upper')
const copied = ref(false)

const modes = [
  { key: 'upper', label: 'UPPER CASE' },
  { key: 'lower', label: 'lower case' },
  { key: 'title', label: 'Title Case' },
  { key: 'camel', label: 'camelCase' },
  { key: 'snake', label: 'snake_case' },
  { key: 'kebab', label: 'kebab-case' }
]

const converters: Record<string, (s: string) => string> = {
  upper: toUpperCase,
  lower: toLowerCase,
  title: toTitleCase,
  camel: toCamelCase,
  snake: toSnakeCase,
  kebab: toKebabCase
}

const output = computed(() => {
  if (!input.value) return ''
  return converters[activeMode.value](input.value)
})

async function copyOutput() {
  if (!output.value) return
  await navigator.clipboard.writeText(output.value)
  copied.value = true
  setTimeout(() => { copied.value = false }, 1500)
}
</script>

<template>
  <div class="space-y-6">
    <UCard>
      <template #header>
        <div>
          <h2 class="text-lg font-semibold">Case Converter</h2>
          <p class="text-sm text-muted">Transform text between different casing styles</p>
        </div>
      </template>

      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium mb-1.5">Input</label>
          <UTextarea
            v-model="input"
            placeholder="Paste or type your text here..."
            :rows="5"
            autoresize
          />
        </div>

        <div>
          <label class="block text-sm font-medium mb-1.5">Conversion Mode</label>
          <div class="flex flex-wrap gap-2">
            <UButton
              v-for="mode in modes"
              :key="mode.key"
              :variant="activeMode === mode.key ? 'solid' : 'outline'"
              :color="activeMode === mode.key ? 'primary' : 'neutral'"
              size="sm"
              @click="activeMode = mode.key"
            >
              {{ mode.label }}
            </UButton>
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between mb-1.5">
            <label class="text-sm font-medium">Output</label>
            <UButton
              v-if="output"
              variant="ghost"
              size="xs"
              :color="copied ? 'success' : 'neutral'"
              @click="copyOutput"
            >
              {{ copied ? 'Copied!' : 'Copy' }}
            </UButton>
          </div>
          <UTextarea
            :model-value="output"
            readonly
            placeholder="Output will appear here..."
            :rows="5"
            autoresize
          />
        </div>
      </div>
    </UCard>
  </div>
</template>
