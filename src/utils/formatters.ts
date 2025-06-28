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

export const encodeBase64 = (text: string): string => {
  try {
    return btoa(text);
  } catch (error) {
    throw new Error('Failed to encode to Base64');
  }
};

export const decodeBase64 = (text: string): string => {
  try {
    return atob(text);
  } catch (error) {
    throw new Error('Invalid Base64 string');
  }
};

export const encodeURL = (text: string): string => {
  return encodeURIComponent(text);
};

export const decodeURL = (text: string): string => {
  try {
    return decodeURIComponent(text);
  } catch (error) {
    throw new Error('Invalid URL encoded string');
  }
};

export const generateSHA256 = async (text: string): Promise<string> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};