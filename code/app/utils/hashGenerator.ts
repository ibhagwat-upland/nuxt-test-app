export interface HashResult {
  hash: string
  algorithm: string
}

export async function generateHash(input: string, algorithm: 'SHA-1' | 'SHA-256' | 'SHA-512'): Promise<HashResult> {
  if (!input) {
    return {
      hash: '',
      algorithm
    }
  }

  try {
    // Convert string to ArrayBuffer
    const encoder = new TextEncoder()
    const data = encoder.encode(input)
    
    // Generate hash
    const hashBuffer = await crypto.subtle.digest(algorithm, data)
    
    // Convert ArrayBuffer to hex string
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
    
    return {
      hash: hashHex,
      algorithm
    }
  } catch (error) {
    console.error('Hash generation failed:', error)
    return {
      hash: '',
      algorithm
    }
  }
}
