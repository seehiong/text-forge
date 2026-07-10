//src/utils/__tests__/htmlFormatter.test.ts

import { describe, it, expect } from 'vitest';
import { beautifyHTML, minifyHTML } from '../htmlFormatter';

describe('htmlFormatter utilities', () => {
  const dirtyHtml = `
    <!-- Header -->
    <div class="container">
      <h1>Hello World</h1>
      <p>Paragraph text</p>
      <img src="logo.png" />
    </div>
  `;

  it('should minify HTML by stripping spaces and comments', () => {
    const minified = minifyHTML(dirtyHtml);
    expect(minified).toBe('<div class="container"><h1>Hello World</h1><p>Paragraph text</p><img src="logo.png" /></div>');
  });

  it('should beautify HTML with proper tag indentations', () => {
    const beautified = beautifyHTML(dirtyHtml);
    expect(beautified).toBe(
      `<div class="container">
  <h1>
    Hello World
  </h1>
  <p>
    Paragraph text
  </p>
  <img src="logo.png" />
</div>`
    );
  });
});
