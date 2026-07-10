//src/utils/encoding.ts

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

// Base64Url Decoder for JWT tokens
export const decodeBase64Url = (str: string): string => {
  let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
  while (base64.length % 4) {
    base64 += '=';
  }
  try {
    return atob(base64);
  } catch (e) {
    throw new Error('Invalid Base64Url string');
  }
};

// JWT Parser
export const decodeJWT = (token: string): { header: any; payload: any } => {
  const parts = token.trim().split('.');
  if (parts.length !== 3) {
    throw new Error('Invalid JWT format: Must have exactly 3 parts separated by dots');
  }
  try {
    const headerStr = decodeBase64Url(parts[0]);
    const payloadStr = decodeBase64Url(parts[1]);
    return {
      header: JSON.parse(headerStr),
      payload: JSON.parse(payloadStr)
    };
  } catch (error) {
    throw new Error('Failed to decode JWT payload: Invalid JSON data inside token');
  }
};

// URL Query Parameters Parser
export interface ParsedURL {
  protocol: string;
  host: string;
  pathname: string;
  queryParams: Array<{ key: string; value: string }>;
}

export const parseURL = (urlString: string): ParsedURL => {
  try {
    let workingUrl = urlString.trim();
    if (!/^[a-zA-Z]+:\/\//.test(workingUrl)) {
      workingUrl = 'http://' + workingUrl;
    }
    const url = new URL(workingUrl);
    const queryParams: Array<{ key: string; value: string }> = [];
    url.searchParams.forEach((value, key) => {
      queryParams.push({ key, value });
    });
    return {
      protocol: url.protocol,
      host: url.host,
      pathname: url.pathname,
      queryParams
    };
  } catch (error) {
    throw new Error('Invalid URL format');
  }
};

// URL Query Parameters Builder
export const buildURL = (
  base: { protocol: string; host: string; pathname: string },
  queryParams: Array<{ key: string; value: string }>
): string => {
  try {
    const basePart = `${base.protocol}//${base.host}${base.pathname}`;
    const url = new URL(basePart);
    queryParams.forEach(p => {
      if (p.key.trim()) {
        url.searchParams.append(p.key.trim(), p.value);
      }
    });
    return url.toString();
  } catch (error) {
    throw new Error('Failed to build URL');
  }
};
