<script setup lang="ts">
import { formatJson, minifyJson } from '~/utils/jsonFormatter'

const input = ref('')
const activeMode = ref('format-2')
const copied = ref(false)

const modes = [
  { key: 'format-2', label: '2 Spaces' },
  { key: 'format-4', label: '4 Spaces' },
  { key: 'format-tab', label: 'Tab' },
  { key: 'minify', label: 'Minify' }
]

const result = computed(() => {
  if (!input.value) return { output: '', isValid: true }
  
  switch (activeMode.value) {
    case 'format-2':
      return formatJson(input.value, 2)
    case 'format-4':
      return formatJson(input.value, 4)
    case 'format-tab':
      return formatJson(input.value, '\t' as any)
    case 'minify':
      return minifyJson(input.value)
    default:
      return { output: '', isValid: true }
  }
})

const output = computed(() => result.value.output)
const error = computed(() => result.value.error)

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
          <h2 class="text-lg font-semibold">JSON Formatter</h2>
          <p class="text-sm text-muted">Format, minify, and validate JSON</p>
        </div>
      </template>

      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium mb-1.5">Input JSON</label>
          <UTextarea
            v-model="input"
            placeholder='Paste your JSON here... e.g. {"name":"value"}'
            :rows="8"
            autoresize
            :class="{ 'border-red-500': error }"
          />
          <p v-if="error" class="text-red-500 text-sm mt-1">
            {{ error }}
          </p>
        </div>

        <div>
          <label class="block text-sm font-medium mb-1.5">Format Mode</label>
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
            placeholder="Formatted JSON will appear here..."
            :rows="8"
            autoresize
          />
        </div>
      </div>
    </UCard>
  </div>
</template>
