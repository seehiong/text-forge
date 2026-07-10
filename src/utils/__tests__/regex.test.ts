//src/utils/__tests__/regex.test.ts

import { describe, it, expect } from 'vitest';
import { matchRegex } from '../regex';

describe('regex utilities', () => {
  it('should find single match without global flag', () => {
    const text = 'hello 123 world 456';
    const matches = matchRegex(text, '\\d+', '');
    expect(matches.length).toBe(1);
    expect(matches[0]).toEqual({
      index: 6,
      match: '123',
      groups: []
    });
  });

  it('should find all matches with global flag', () => {
    const text = 'hello 123 world 456';
    const matches = matchRegex(text, '\\d+', 'g');
    expect(matches.length).toBe(2);
    expect(matches[0].match).toBe('123');
    expect(matches[1].match).toBe('456');
    expect(matches[1].index).toBe(16);
  });

  it('should extract capturing groups', () => {
    const text = 'category: science';
    const matches = matchRegex(text, 'category: (\\w+)', '');
    expect(matches.length).toBe(1);
    expect(matches[0].groups).toEqual(['science']);
  });

  it('should handle zero-width matches without infinite looping', () => {
    const text = 'abc';
    const matches = matchRegex(text, 'a*', 'g');
    // a* matches 'a' at 0, '' at 1, '' at 2, '' at 3
    expect(matches.length).toBeGreaterThan(1);
  });

  it('should throw error on invalid regex syntax', () => {
    expect(() => matchRegex('text', '[invalid', '')).toThrow('Invalid Regular Expression pattern');
  });
});
