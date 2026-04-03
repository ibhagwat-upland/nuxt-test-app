<script setup lang="ts">
import { shortenUrl } from '~/utils/urlShortener'

const input = ref('')
const customDomain = ref('short.link')
const copied = ref(false)
const shortenedUrls = ref<Array<{ original: string, short: string, code: string }>>([])

const result = computed(() => {
  if (!input.value) return { shortUrl: '', shortCode: '', originalUrl: '', isValid: true }
  return shortenUrl(input.value, customDomain.value)
})

const error = computed(() => result.value.error)

function addToHistory() {
  if (!result.value.isValid) return
  
  // Check if URL already exists in history
  const exists = shortenedUrls.value.some(item => item.original === result.value.originalUrl)
  if (!exists) {
    shortenedUrls.value.unshift({
      original: result.value.originalUrl,
      short: result.value.shortUrl,
      code: result.value.shortCode
    })
    
    // Keep only last 5 entries
    if (shortenedUrls.value.length > 5) {
      shortenedUrls.value = shortenedUrls.value.slice(0, 5)
    }
  }
  
  input.value = ''
}

async function copyToClipboard(text: string) {
  await navigator.clipboard.writeText(text)
  copied.value = true
  setTimeout(() => { copied.value = false }, 1500)
}

function clearHistory() {
  shortenedUrls.value = []
}
</script>

<template>
  <div class="space-y-6">
    <UCard>
      <template #header>
        <div>
          <h2 class="text-lg font-semibold">URL Shortener</h2>
          <p class="text-sm text-muted">Generate short URLs (demo version)</p>
        </div>
      </template>

      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium mb-1.5">Long URL</label>
          <UInput
            v-model="input"
            placeholder="https://example.com/very/long/url/path"
            size="lg"
            :class="{ 'border-red-500': error }"
            @keyup.enter="addToHistory"
          />
          <p v-if="error" class="text-red-500 text-sm mt-1">
            {{ error }}
          </p>
        </div>

        <div>
          <label class="block text-sm font-medium mb-1.5">Custom Domain (optional)</label>
          <UInput
            v-model="customDomain"
            placeholder="short.link"
            size="sm"
          />
        </div>

        <div v-if="result.isValid && result.shortUrl" class="p-4 bg-muted/50 rounded-lg">
          <div class="flex items-center justify-between">
            <div class="flex-1 min-w-0">
              <p class="text-xs text-muted mb-1">Shortened URL</p>
              <p class="font-mono text-sm font-medium truncate">{{ result.shortUrl }}</p>
            </div>
            <UButton
              variant="ghost"
              size="sm"
              :color="copied ? 'success' : 'neutral'"
              @click="copyToClipboard(result.shortUrl)"
            >
              {{ copied ? 'Copied!' : 'Copy' }}
            </UButton>
          </div>
        </div>

        <UButton
          v-if="result.isValid && result.shortUrl"
          block
          @click="addToHistory"
        >
          Add to History
        </UButton>
      </div>
    </UCard>

    <UCard v-if="shortenedUrls.length > 0">
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="text-base font-semibold">Recent URLs</h3>
          <UButton
            variant="ghost"
            size="xs"
            color="neutral"
            @click="clearHistory"
          >
            Clear
          </UButton>
        </div>
      </template>

      <div class="space-y-3">
        <div
          v-for="(item, index) in shortenedUrls"
          :key="index"
          class="p-3 border border-default rounded-lg hover:bg-muted/30 transition-colors"
        >
          <div class="flex items-start justify-between gap-3">
            <div class="flex-1 min-w-0 space-y-1">
              <div class="flex items-center gap-2">
                <span class="font-mono text-sm font-medium text-primary">{{ item.short }}</span>
                <UButton
                  variant="ghost"
                  size="xs"
                  @click="copyToClipboard(item.short)"
                >
                  Copy
                </UButton>
              </div>
              <p class="text-xs text-muted truncate">{{ item.original }}</p>
            </div>
          </div>
        </div>
      </div>
    </UCard>
  </div>
</template>
