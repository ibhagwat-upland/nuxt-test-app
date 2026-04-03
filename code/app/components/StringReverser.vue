<script setup lang="ts">
import { reverseChars, reverseWords } from '~/utils/stringReverser'

const input = ref('')
const activeMode = ref('chars')
const copied = ref(false)

const modes = [
  { key: 'chars', label: 'Reverse Characters' },
  { key: 'words', label: 'Reverse Words' }
]

const converters: Record<string, (s: string) => string> = {
  chars: reverseChars,
  words: reverseWords
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
          <h2 class="text-lg font-semibold">String Reverser</h2>
          <p class="text-sm text-muted">Reverse characters or word order in your text</p>
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
          <label class="block text-sm font-medium mb-1.5">Reverse Mode</label>
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
