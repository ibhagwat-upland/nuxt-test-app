<script setup lang="ts">
const tabs = [
  { label: 'Case Converter', value: 'case-converter' },
  { label: 'String Reverser', value: 'string-reverser' },
  { label: 'Text Counter', value: 'text-counter' },
  { label: 'JSON Formatter', value: 'json-formatter' },
  { label: 'URL Shortener', value: 'url-shortener' },
  { label: 'Hash Generator', value: 'hash-generator' }
]

const activeTab = ref('case-converter')
</script>

<template>
  <div class="min-h-screen bg-default">
    <header class="border-b border-default px-6 py-4">
      <div class="max-w-3xl mx-auto flex items-baseline justify-between">
        <h1 class="text-xl font-bold tracking-tight">Release Management Test</h1>
        <span class="text-sm text-muted">login</span>
      </div>
    </header>

    <nav class="border-b border-default px-6">
      <div class="max-w-3xl mx-auto">
        <UTabs
          v-model="activeTab"
          :items="tabs"
          variant="link"
        />
      </div>
    </nav>

    <main class="max-w-3xl mx-auto px-6 py-8">
      <CaseConverter v-if="activeTab === 'case-converter'" />
      <StringReverser v-if="activeTab === 'string-reverser'" />
      <TextCounter v-if="activeTab === 'text-counter'" />
      <JsonFormatter v-if="activeTab === 'json-formatter'" />
      <UrlShortener v-if="activeTab === 'url-shortener'" />
      <HashGenerator v-if="activeTab === 'hash-generator'" />
    </main>
  </div>
</template>
