//src/utils/__tests__/formatters.test.ts

import { describe, it, expect } from 'vitest';
import { formatJSON, convertKvToJson, minifyCSS } from '../formatters';

describe('formatters - JSON formatting', () => {
  it('should beautify valid JSON string', () => {
    const raw = '{"name":"John","age":30}';
    const formatted = formatJSON(raw, true);
    expect(formatted).toBe(
      `{
  "name": "John",
  "age": 30
}`
    );
  });

  it('should minify valid JSON string', () => {
    const raw = `{
  "name": "John",
  "age": 30
}`;
    const minified = formatJSON(raw, false);
    expect(minified).toBe('{"name":"John","age":30}');
  });

  it('should throw error for invalid JSON', () => {
    expect(() => formatJSON('{"invalid": }')).toThrow('Invalid JSON format');
  });
});

describe('formatters - Key-Value to JSON conversion', () => {
  it('should convert standard key=value lines to JSON string', () => {
    const raw = 'name=John Doe\nage=30\ncity=New York';
    const result = convertKvToJson(raw);
    const parsed = JSON.parse(result);

    expect(parsed).toEqual({
      name: 'John Doe',
      age: '30',
      city: 'New York'
    });
  });

  it('should handle spaces around key-value pairs and equals sign', () => {
    const raw = '  first_name =   Alice \n last_name = Bob  ';
    const result = convertKvToJson(raw);
    const parsed = JSON.parse(result);

    expect(parsed).toEqual({
      first_name: 'Alice',
      last_name: 'Bob'
    });
  });

  it('should handle duplicate values containing equals sign', () => {
    const raw = 'url=https://example.com?param=value';
    const result = convertKvToJson(raw);
    const parsed = JSON.parse(result);
    expect(parsed.url).toBe('https://example.com?param=value');
  });
});

describe('formatters - CSS minification', () => {
  it('should strip comments and spaces in CSS', () => {
    const css = `
      /* Header styles */
      .header {
        color: #ff0000;
        margin: 10px 20px;
      }
      
      // Inline comments if any
      .title {
        font-size: 16px;
      }
    `;
    const minified = minifyCSS(css);
    expect(minified).toBe('.header{color:#ff0000;margin:10px 20px;}.title{font-size:16px;}');
  });
});
