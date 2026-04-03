export interface FormatResult {
  output: string
  error?: string
  isValid: boolean
}

export function formatJson(input: string, indent: number = 2): FormatResult {
  if (!input.trim()) {
    return {
      output: '',
      error: 'Please enter some JSON to format',
      isValid: false
    }
  }
  
  try {
    const parsed = JSON.parse(input)
    return {
      output: JSON.stringify(parsed, null, indent),
      isValid: true
    }
  } catch (error) {
    let errorMsg = 'Invalid JSON'
    if (error instanceof SyntaxError) {
      errorMsg = error.message
    }
    return {
      output: '',
      error: errorMsg,
      isValid: false
    }
  }
}

export function minifyJson(input: string): FormatResult {
  if (!input.trim()) {
    return {
      output: '',
      error: 'Please enter some JSON to minify',
      isValid: false
    }
  }
  
  try {
    const parsed = JSON.parse(input)
    return {
      output: JSON.stringify(parsed),
      isValid: true
    }
  } catch (error) {
    let errorMsg = 'Invalid JSON'
    if (error instanceof SyntaxError) {
      errorMsg = error.message
    }
    return {
      output: '',
      error: errorMsg,
      isValid: false
    }
  }
}
