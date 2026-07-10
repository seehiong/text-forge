//src/utils/htmlFormatter.ts

export const minifyHTML = (html: string): string => {
  return html
    .replace(/<!--[\s\S]*?-->/g, '') // Remove HTML comments
    .replace(/\s+/g, ' ') // Collapse multiple spaces
    .replace(/>\s+</g, '><') // Strip whitespace between tags
    .trim();
};

export const beautifyHTML = (html: string): string => {
  const minified = minifyHTML(html);
  let result = '';
  let indentLevel = 0;
  const indentSize = 2;
  const getIndent = (level: number) => ' '.repeat(level * indentSize);

  // Split content by tags (keeps delimiters in array)
  const tokens = minified.split(/(<\/?[a-zA-Z0-9:-]+(?:\s+[^>]*?)?>)/).filter(Boolean);

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i].trim();
    if (!token) continue;

    const isCloseTag = token.startsWith('</');
    const isOpenTag = token.startsWith('<') && !token.startsWith('</') && !token.endsWith('/>');
    const isSelfClosing = token.startsWith('<') && token.endsWith('/>');
    const isCommentOrDocType = token.startsWith('<!') || token.startsWith('<?') || isSelfClosing;

    if (isCloseTag) {
      indentLevel = Math.max(0, indentLevel - 1);
    }

    if (result) result += '\n';
    result += getIndent(indentLevel) + token;

    if (isOpenTag && !isCommentOrDocType) {
      indentLevel++;
    }
  }

  return result;
};
