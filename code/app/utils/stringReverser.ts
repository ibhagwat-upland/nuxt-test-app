export function reverseChars(s: string): string {
  if (!s) return ''
  return [...s].reverse().join('')
}

export function reverseWords(s: string): string {
  if (!s.trim()) return ''
  return s.trim().split(/\s+/).reverse().join(' ')
}
