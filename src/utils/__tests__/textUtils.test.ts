//src/utils/__tests__/textUtils.test.ts

import { describe, it, expect } from 'vitest';
import { getTextStats, cleanupText, convertCase } from '../textUtils';

describe('textUtils - Statistics', () => {
  it('should calculate correct text statistics', () => {
    const text = '  Hello \n world!  ';
    const stats = getTextStats(text);

    // Words: 'Hello', 'world!' -> 2
    expect(stats.words).toBe(2);
    // Lines: '  Hello \n world!  ' -> 2 lines split by \n
    expect(stats.lines).toBe(2);
    // Characters: raw length including all spaces and line breaks
    expect(stats.characters).toBe(text.length);
    // Characters (no spaces): length of 'Helloworld!' -> 11
    expect(stats.charactersNoSpaces).toBe(11);
  });

  it('should handle empty text gracefully', () => {
    const stats = getTextStats('');
    expect(stats.words).toBe(0);
    expect(stats.lines).toBe(1);
    expect(stats.characters).toBe(0);
    expect(stats.charactersNoSpaces).toBe(0);
  });
});

describe('textUtils - Cleanup', () => {
  it('should collapse multiple spaces with removeExtraSpaces', () => {
    const input = 'hello    world  new\tspaces';
    const result = cleanupText(input, 'removeExtraSpaces');
    expect(result).toBe('hello world new spaces');
  });

  it('should convert breaks to spaces with removeLineBreaks', () => {
    const input = 'hello\nworld\r\nnext';
    const result = cleanupText(input, 'removeLineBreaks');
    expect(result).toBe('hello world next');
  });

  it('should strip all whitespace with removeAllSpaces', () => {
    const input = ' h e l l o \n w o r l d ';
    const result = cleanupText(input, 'removeAllSpaces');
    expect(result).toBe('helloworld');
  });

  it('should trim whitespace per-line with trimLines', () => {
    const input = '  line one  \n  line two  ';
    const result = cleanupText(input, 'trimLines');
    expect(result).toBe('line one\nline two');
  });

  it('should return original text for unknown actions', () => {
    const input = 'hello';
    expect(cleanupText(input, 'unknown')).toBe('hello');
  });
});

describe('textUtils - Case Conversions', () => {
  const text = 'hello world';

  it('should convert to uppercase', () => {
    expect(convertCase(text, 'uppercase')).toBe('HELLO WORLD');
  });

  it('should convert to lowercase', () => {
    expect(convertCase('HELLO WORLD', 'lowercase')).toBe('hello world');
  });

  it('should convert to sentence case', () => {
    expect(convertCase(text, 'sentence')).toBe('Hello world');
  });

  it('should convert to title case', () => {
    expect(convertCase(text, 'title')).toBe('Hello World');
  });

  it('should convert to camelCase', () => {
    expect(convertCase(text, 'camelCase')).toBe('helloWorld');
    expect(convertCase('hello_world-test', 'camelCase')).toBe('helloWorldTest');
  });

  it('should convert to pascalCase', () => {
    expect(convertCase(text, 'pascalCase')).toBe('HelloWorld');
  });

  it('should convert to snake_case', () => {
    expect(convertCase(text, 'snake_case')).toBe('hello_world');
  });

  it('should convert to kebab-case', () => {
    expect(convertCase(text, 'kebab-case')).toBe('hello-world');
  });

  it('should convert to CONSTANT_CASE', () => {
    expect(convertCase(text, 'CONSTANT_CASE')).toBe('HELLO_WORLD');
  });
});
