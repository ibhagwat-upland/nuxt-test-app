export interface ShortenResult {
  shortUrl: string
  shortCode: string
  originalUrl: string
  error?: string
  isValid: boolean
}

export function isValidUrl(url: string): boolean {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

export function generateShortCode(url: string): string {
  // Simple hash function to generate a short code
  let hash = 0
  const normalized = url.toLowerCase().trim()
  
  for (let i = 0; i < normalized.length; i++) {
    const char = normalized.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // Convert to 32bit integer
  }
  
  // Convert to base36 and take first 6 characters
  const code = Math.abs(hash).toString(36).substring(0, 6)
  return code || 'abc123' // Fallback for edge cases
}

export function shortenUrl(url: string, domain: string = 'short.link'): ShortenResult {
  // Validate URL
  if (!url.trim()) {
    return {
      shortUrl: '',
      shortCode: '',
      originalUrl: url,
      error: 'Please enter a URL',
      isValid: false
    }
  }

  if (!isValidUrl(url)) {
    return {
      shortUrl: '',
      shortCode: '',
      originalUrl: url,
      error: 'Please enter a valid URL (must include protocol like https://)',
      isValid: false
    }
  }

  const shortCode = generateShortCode(url)
  const shortUrl = `https://${domain}/${shortCode}`

  return {
    shortUrl,
    shortCode,
    originalUrl: url,
    isValid: true
  }
}
