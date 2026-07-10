//src/utils/regex.ts

export interface RegexMatch {
  index: number;
  match: string;
  groups: string[];
}

export const matchRegex = (text: string, pattern: string, flags: string): RegexMatch[] => {
  if (!pattern) return [];
  try {
    const regex = new RegExp(pattern, flags);
    const matches: RegexMatch[] = [];

    if (flags.includes('g')) {
      let match;
      while ((match = regex.exec(text)) !== null) {
        matches.push({
          index: match.index,
          match: match[0],
          groups: match.slice(1)
        });
        // Avoid infinite loop on zero-width matches (e.g. /a*/)
        if (regex.lastIndex === match.index) {
          regex.lastIndex++;
        }
      }
    } else {
      const match = regex.exec(text);
      if (match) {
        matches.push({
          index: match.index,
          match: match[0],
          groups: match.slice(1)
        });
      }
    }
    return matches;
  } catch (error) {
    throw new Error('Invalid Regular Expression pattern');
  }
};
