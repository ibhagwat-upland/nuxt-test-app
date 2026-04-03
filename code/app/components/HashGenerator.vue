<script setup lang="ts">
import { generateHash } from '~/utils/hashGenerator'

const input = ref('')
const activeAlgorithm = ref<'SHA-1' | 'SHA-256' | 'SHA-512'>('SHA-256')
const hashes = ref<Record<string, string>>({
  'SHA-1': '',
  'SHA-256': '',
  'SHA-512': ''
})
const copied = ref('')

const algorithms = [
  { key: 'SHA-1' as const, label: 'SHA-1', description: '160-bit hash' },
  { key: 'SHA-256' as const, label: 'SHA-256', description: '256-bit hash (recommended)' },
  { key: 'SHA-512' as const, label: 'SHA-512', description: '512-bit hash' }
]

// Generate hashes whenever input changes
watch(input, async (newInput) => {
  if (!newInput) {
    hashes.value = {
      'SHA-1': '',
      'SHA-256': '',
      'SHA-512': ''
    }
    return
  }

  // Generate all hashes
  for (const algo of algorithms) {
    const result = await generateHash(newInput, algo.key)
    hashes.value[algo.key] = result.hash
  }
}, { immediate: true })

const currentHash = computed(() => hashes.value[activeAlgorithm.value])

async function copyHash(algorithm: string, hash: string) {
  if (!hash) return
  await navigator.clipboard.writeText(hash)
  copied.value = algorithm
  setTimeout(() => { copied.value = '' }, 1500)
}
</script>

<template>
  <div class="space-y-6">
    <UCard>
      <template #header>
        <div>
          <h2 class="text-lg font-semibold">Hash Generator</h2>
          <p class="text-sm text-muted">Generate cryptographic hashes (SHA-1, SHA-256, SHA-512)</p>
        </div>
      </template>

      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium mb-1.5">Input Text</label>
          <UTextarea
            v-model="input"
            placeholder="Enter text to hash..."
            :rows="4"
            autoresize
          />
        </div>

        <div>
          <label class="block text-sm font-medium mb-1.5">Hash Algorithm</label>
          <div class="flex flex-wrap gap-2">
            <UButton
              v-for="algo in algorithms"
              :key="algo.key"
              :variant="activeAlgorithm === algo.key ? 'solid' : 'outline'"
              :color="activeAlgorithm === algo.key ? 'primary' : 'neutral'"
              size="sm"
              @click="activeAlgorithm = algo.key"
            >
              {{ algo.label }}
            </UButton>
          </div>
          <p v-if="activeAlgorithm" class="text-xs text-muted mt-2">
            {{ algorithms.find(a => a.key === activeAlgorithm)?.description }}
          </p>
        </div>

        <div v-if="currentHash" class="p-4 bg-muted/50 rounded-lg">
          <div class="flex items-start justify-between gap-3">
            <div class="flex-1 min-w-0">
              <p class="text-xs text-muted mb-1">{{ activeAlgorithm }} Hash</p>
              <p class="font-mono text-sm break-all">{{ currentHash }}</p>
            </div>
            <UButton
              variant="ghost"
              size="sm"
              :color="copied === activeAlgorithm ? 'success' : 'neutral'"
              @click="copyHash(activeAlgorithm, currentHash)"
            >
              {{ copied === activeAlgorithm ? 'Copied!' : 'Copy' }}
            </UButton>
          </div>
        </div>
      </div>
    </UCard>

    <!-- All Hashes Card -->
    <UCard v-if="input">
      <template #header>
        <h3 class="text-base font-semibold">All Hashes</h3>
      </template>

      <div class="space-y-3">
        <div
          v-for="algo in algorithms"
          :key="algo.key"
          class="p-3 border border-default rounded-lg"
        >
          <div class="flex items-start justify-between gap-3">
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2 mb-1">
                <span class="text-sm font-medium">{{ algo.label }}</span>
                <span class="text-xs text-muted">{{ algo.description }}</span>
              </div>
              <p class="font-mono text-xs break-all text-muted">{{ hashes[algo.key] || 'Generating...' }}</p>
            </div>
            <UButton
              variant="ghost"
              size="xs"
              :color="copied === algo.key ? 'success' : 'neutral'"
              @click="copyHash(algo.key, hashes[algo.key])"
            >
              {{ copied === algo.key ? '✓' : 'Copy' }}
            </UButton>
          </div>
        </div>
      </div>
    </UCard>
  </div>
</template>
