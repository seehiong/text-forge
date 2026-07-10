//src/utils/formatters.ts

export const formatJSON = (text: string, beautify: boolean = true): string => {
  try {
    const jsonObj = JSON.parse(text);
    return JSON.stringify(jsonObj, null, beautify ? 2 : 0);
  } catch (error) {
    throw new Error('Invalid JSON format');
  }
};

export const convertKvToJson = (text: string): string => {
  try {
    const lines = text.split('\n').filter(line => line.includes('='));
    const obj = lines.reduce((acc, line) => {
      const [key, ...valueParts] = line.split('=');
      acc[key.trim()] = valueParts.join('=').trim();
      return acc;
    }, {} as Record<string, string>);
    return JSON.stringify(obj, null, 2);
  } catch (error) {
    throw new Error('Invalid key-value format');
  }
};

export const minifyCSS = (css: string): string => {
  return css
    .replace(/\/\*[\s\S]*?\*\/|([^:]|^)\/\/.*$/gm, '') // Remove comments
    .replace(/\s+/g, ' ') // Collapse whitespace
    .replace(/ ?([{:};,]) ?/g, '$1') // Remove space around operators
    .trim();
};