export interface TextStats {
  characters: number
  charactersNoSpaces: number
  words: number
  lines: number
  sentences: number
  paragraphs: number
}

export function countText(text: string): TextStats {
  if (!text) {
    return {
      characters: 0,
      charactersNoSpaces: 0,
      words: 0,
      lines: 0,
      sentences: 0,
      paragraphs: 0
    }
  }

  const characters = text.length
  const charactersNoSpaces = text.replace(/\s/g, '').length
  
  // Count words (split by whitespace, filter empty strings)
  const trimmed = text.trim()
  const words = trimmed ? trimmed.split(/\s+/).filter(Boolean).length : 0
  
  // Count lines (split by line breaks)
  const lines = text.split(/\n/).length
  
  // Count sentences (basic - ends with . ! ? followed by space or end)
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0).length
  
  // Count paragraphs (separated by empty lines)
  const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim().length > 0).length

  return {
    characters,
    charactersNoSpaces,
    words,
    lines,
    sentences,
    paragraphs
  }
}
