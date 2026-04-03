export interface FormatResult {
  output: string
  error?: string
  isValid: boolean
}

export function formatJson(input: string, indent: number = 2): FormatResult {
  try {
    const parsed = JSON.parse(input)
    return {
      output: JSON.stringify(parsed, null, indent),
      isValid: true
    }
  } catch (error) {
    return {
      output: '',
      error: error instanceof Error ? error.message : 'Invalid JSON',
      isValid: false
    }
  }
}

export function minifyJson(input: string): FormatResult {
  try {
    const parsed = JSON.parse(input)
    return {
      output: JSON.stringify(parsed),
      isValid: true
    }
  } catch (error) {
    return {
      output: '',
      error: error instanceof Error ? error.message : 'Invalid JSON',
      isValid: false
    }
  }
}
