//src/utils/__tests__/lorem.test.ts

import { describe, it, expect } from 'vitest';
import { generateLorem } from '../lorem';

describe('lorem utilities', () => {
  it('should generate words', () => {
    const result = generateLorem(5, 'words');
    const words = result.split(' ');
    expect(words.length).toBe(5);
    expect(result).toBe('lorem ipsum dolor sit amet');
  });

  it('should generate sentences ending with a dot and capitalized', () => {
    const result = generateLorem(3, 'sentences');
    expect(result.endsWith('.')).toBe(true);
    // Three sentences should have three periods
    const sentenceCount = result.split('.').length - 1;
    expect(sentenceCount).toBe(3);
    // The first letter of the string should be uppercase
    expect(result[0]).toBe(result[0].toUpperCase());
  });

  it('should generate paragraphs separated by double linebreaks', () => {
    const result = generateLorem(2, 'paragraphs');
    const paragraphs = result.split('\n\n');
    expect(paragraphs.length).toBe(2);
  });
});
