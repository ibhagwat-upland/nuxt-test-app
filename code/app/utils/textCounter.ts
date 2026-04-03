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
  
  // Count sentences (improved - handle multiple punctuation and abbreviations)
  const sentenceEnders = text.match(/[.!?]+(?=\s|$)/g)
  const sentences = sentenceEnders ? sentenceEnders.length : (text.trim() ? 1 : 0)
  
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
