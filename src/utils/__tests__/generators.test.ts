//src/utils/__tests__/generators.test.ts

import { describe, it, expect } from 'vitest';
import { generateUUID, generatePassword } from '../generators';

describe('generators - UUID generation', () => {
  it('should generate valid UUID v4 formats', () => {
    const uuid = generateUUID(4);

    // Check format: 8-4-4-4-12 hex characters
    const uuidv4Regex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    expect(uuid).toMatch(uuidv4Regex);
  });

  it('should generate valid UUID v1 formats', () => {
    const uuid = generateUUID(1);
    const uuidv1Regex = /^[0-9a-f]{8}-[0-9a-f]{4}-1[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    expect(uuid).toMatch(uuidv1Regex);
  });
});

describe('generators - Password generation', () => {
  it('should respect requested length options', () => {
    const length = 24;
    const password = generatePassword(length, { lowercase: true });
    expect(password.length).toBe(length);
  });

  it('should throw error if zero options are selected', () => {
    expect(() => generatePassword(16, {
      lowercase: false,
      uppercase: false,
      numbers: false,
      symbols: false
    })).toThrow('At least one character type must be selected');
  });

  it('should contain only uppercase letters when only uppercase is selected', () => {
    const password = generatePassword(50, {
      lowercase: false,
      uppercase: true,
      numbers: false,
      symbols: false
    });

    expect(/^[A-Z]+$/.test(password)).toBe(true);
  });

  it('should contain only numbers when only numbers are selected', () => {
    const password = generatePassword(50, {
      lowercase: false,
      uppercase: false,
      numbers: true,
      symbols: false
    });

    expect(/^[0-9]+$/.test(password)).toBe(true);
  });

  it('should generate secure passwords containing multiple classes', () => {
    const password = generatePassword(100, {
      lowercase: true,
      uppercase: true,
      numbers: true,
      symbols: true
    });

    // With a length of 100, we expect all selected classes to appear at least once (probabilistically near-certain)
    expect(/[a-z]/.test(password)).toBe(true);
    expect(/[A-Z]/.test(password)).toBe(true);
    expect(/[0-9]/.test(password)).toBe(true);
    expect(/[!@#$%^&*()_+\-=[\]{}|;:,.<>?]/.test(password)).toBe(true);
  });
});
