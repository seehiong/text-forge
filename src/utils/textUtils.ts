import { TextStats } from '../types';

export const getTextStats = (text: string): TextStats => {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const characters = text.length;
  const lines = text.split('\n').length;
  const charactersNoSpaces = text.replace(/\s/g, '').length;

  return { words, characters, lines, charactersNoSpaces };
};

export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Failed to copy text: ', err);
    return false;
  }
};

export const cleanupText = (text: string, action: string): string => {
  switch (action) {
    case 'removeExtraSpaces':
      return text.replace(/\s+/g, ' ').trim();
    case 'removeLineBreaks':
      return text.replace(/(\r\n|\n|\r)/gm, ' ').trim();
    case 'removeAllSpaces':
      return text.replace(/\s/g, '');
    case 'trimLines':
      return text.split('\n').map(line => line.trim()).join('\n');
    default:
      return text;
  }
};

export const convertCase = (text: string, caseType: string): string => {
  switch (caseType) {
    case 'uppercase':
      return text.toUpperCase();
    case 'lowercase':
      return text.toLowerCase();
    case 'sentence':
      return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    case 'title':
      return text.replace(/\w\S*/g, (txt) => 
        txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
      );
    case 'camelCase':
      return text.toLowerCase().replace(/([-_ ][a-z])/g, g => 
        g.toUpperCase().replace(/[-_ ]/g, '')
      );
    case 'pascalCase':
      const camel = convertCase(text, 'camelCase');
      return camel.charAt(0).toUpperCase() + camel.slice(1);
    case 'snake_case':
      return text.toLowerCase().replace(/[-\s]/g, '_').replace(/[^a-z0-9_]/g, '');
    case 'kebab-case':
      return text.toLowerCase().replace(/[_\s]/g, '-').replace(/[^a-z0-9-]/g, '');
    case 'CONSTANT_CASE':
      return convertCase(text, 'snake_case').toUpperCase();
    default:
      return text;
  }
};