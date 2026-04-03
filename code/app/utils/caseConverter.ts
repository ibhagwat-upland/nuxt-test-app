function splitWords(s: string): string[] {
  return s
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2')
    .split(/[\s_\-]+/)
    .filter(Boolean)
}

export function toUpperCase(s: string): string {
  return s.toUpperCase()
}

export function toLowerCase(s: string): string {
  return s.toLowerCase()
}

export function toTitleCase(s: string): string {
  return s.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase()
  )
}

export function toCamelCase(s: string): string {
  const words = splitWords(s)
  if (words.length === 0) return ''
  return words
    .map((w, i) =>
      i === 0
        ? w.toLowerCase()
        : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()
    )
    .join('')
}

export function toSnakeCase(s: string): string {
  return splitWords(s).map((w) => w.toLowerCase()).join('_')
}

export function toKebabCase(s: string): string {
  return splitWords(s).map((w) => w.toLowerCase()).join('-')
}
