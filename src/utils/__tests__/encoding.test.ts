//src/utils/__tests__/encoding.test.ts

import { describe, it, expect } from 'vitest';
import {
  encodeBase64,
  decodeBase64,
  encodeURL,
  decodeURL,
  generateSHA256,
  decodeJWT,
  parseURL,
  buildURL
} from '../encoding';

describe('encoding - Base64 codecs', () => {
  it('should encode plain text to Base64', () => {
    expect(encodeBase64('hello world')).toBe('aGVsbG8gd29ybGQ=');
  });

  it('should decode Base64 back to plain text', () => {
    expect(decodeBase64('aGVsbG8gd29ybGQ=')).toBe('hello world');
  });

  it('should throw errors on invalid base64 decode', () => {
    expect(() => decodeBase64('invalid base64!!!')).toThrow('Invalid Base64 string');
  });
});

describe('encoding - URL codecs', () => {
  it('should encode special chars for URL safety', () => {
    expect(encodeURL('hello world & welcome?')).toBe('hello%20world%20%26%20welcome%3F');
  });

  it('should decode URL safe strings back to text', () => {
    expect(decodeURL('hello%20world%20%26%20welcome%3F')).toBe('hello world & welcome?');
  });

  it('should throw error for invalid encoded URL strings', () => {
    expect(() => decodeURL('%E0%A4%A')).toThrow('Invalid URL encoded string');
  });
});

describe('encoding - Cryptographic SHA-256 Hashing', () => {
  it('should generate standard hex hashes from plain text', async () => {
    const text = 'textforge';
    const hash = await generateSHA256(text);
    expect(hash).toBe('5a4e55ab8ebed482f36e20e999c793932605bd4b53c79839ba145711bbd9f8af');
  });
});

describe('encoding - JWT Decoding', () => {
  // Test JWT token with header: {"alg":"HS256","typ":"JWT"} and payload: {"sub":"1234567890","name":"John Doe","iat":1516239022}
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

  it('should parse valid JWT token parts into JSON objects', () => {
    const { header, payload } = decodeJWT(token);
    expect(header).toEqual({ alg: 'HS256', typ: 'JWT' });
    expect(payload).toEqual({ sub: '1234567890', name: 'John Doe', iat: 1516239022 });
  });

  it('should throw error for malformed JWT token string', () => {
    expect(() => decodeJWT('malformedToken')).toThrow('Invalid JWT format');
  });
});

describe('encoding - URL Parsing and Rebuilding', () => {
  const urlStr = 'https://example.com/api/v1/users?name=Alice&age=25&active=true';

  it('should parse URL properties and query parameters', () => {
    const { protocol, host, pathname, queryParams } = parseURL(urlStr);
    expect(protocol).toBe('https:');
    expect(host).toBe('example.com');
    expect(pathname).toBe('/api/v1/users');
    expect(queryParams).toEqual([
      { key: 'name', value: 'Alice' },
      { key: 'age', value: '25' },
      { key: 'active', value: 'true' }
    ]);
  });

  it('should rebuild parsed URL properties into string url format', () => {
    const base = { protocol: 'https:', host: 'example.com', pathname: '/api/v1/users' };
    const params = [
      { key: 'name', value: 'Alice' },
      { key: 'age', value: '25' },
      { key: 'active', value: 'true' }
    ];
    const url = buildURL(base, params);
    expect(url).toBe(urlStr);
  });
});
