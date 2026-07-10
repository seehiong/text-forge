//src/utils/lorem.ts

const LOREM_WORDS = [
  'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit', 'sed', 'do',
  'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore', 'magna', 'aliqua', 'ut',
  'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud', 'exercitation', 'ullamco', 'laboris',
  'nisi', 'ut', 'aliquip', 'ex', 'ea', 'commodo', 'consequat', 'duis', 'aute', 'irure', 'dolor',
  'in', 'reprehenderit', 'in', 'voluptate', 'velit', 'esse', 'cillum', 'dolore', 'eu', 'fugiat',
  'nulla', 'pariatur', 'excepteur', 'sint', 'occaecat', 'cupidatat', 'non', 'proident', 'sunt',
  'in', 'culpa', 'qui', 'officia', 'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum'
];

export const generateLoremWords = (count: number): string => {
  const result: string[] = [];
  for (let i = 0; i < count; i++) {
    result.push(LOREM_WORDS[i % LOREM_WORDS.length]);
  }
  return result.join(' ');
};

export const generateLoremSentences = (count: number): string => {
  const sentences: string[] = [];
  for (let s = 0; s < count; s++) {
    const wordCount = 6 + (s % 7); // 6 to 12 words per sentence
    const words: string[] = [];
    for (let w = 0; w < wordCount; w++) {
      const idx = (s * 7 + w) % LOREM_WORDS.length;
      words.push(LOREM_WORDS[idx]);
    }
    const sentence = words.join(' ');
    sentences.push(sentence.charAt(0).toUpperCase() + sentence.slice(1) + '.');
  }
  return sentences.join(' ');
};

export const generateLoremParagraphs = (count: number): string => {
  const paragraphs: string[] = [];
  for (let p = 0; p < count; p++) {
    const sentenceCount = 3 + (p % 4); // 3 to 6 sentences per paragraph
    const sentences = generateLoremSentences(sentenceCount);
    paragraphs.push(sentences);
  }
  return paragraphs.join('\n\n');
};

export const generateLorem = (
  count: number,
  type: 'paragraphs' | 'sentences' | 'words' = 'paragraphs'
): string => {
  const safeCount = Math.max(1, count);
  switch (type) {
    case 'words':
      return generateLoremWords(safeCount);
    case 'sentences':
      return generateLoremSentences(safeCount);
    case 'paragraphs':
    default:
      return generateLoremParagraphs(safeCount);
  }
};
