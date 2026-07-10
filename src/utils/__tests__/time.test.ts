//src/utils/__tests__/time.test.ts

import { describe, it, expect } from 'vitest';
import { epochToISO, epochToUTC, isoToEpoch } from '../time';

describe('time utilities', () => {
  const testEpochSec = 1783344000; // 2026-07-06T13:20:00Z
  const testEpochMs = 1783344000000;

  it('should convert epoch to ISO string', () => {
    expect(epochToISO(testEpochSec, false)).toBe('2026-07-06T13:20:00.000Z');
    expect(epochToISO(testEpochMs, true)).toBe('2026-07-06T13:20:00.000Z');
  });

  it('should convert epoch to UTC string', () => {
    expect(epochToUTC(testEpochSec, false)).toBe('Mon, 06 Jul 2026 13:20:00 GMT');
  });

  it('should convert ISO string to epoch seconds and ms', () => {
    const { seconds, milliseconds } = isoToEpoch('2026-07-06T13:20:00.000Z');
    expect(seconds).toBe(testEpochSec);
    expect(milliseconds).toBe(testEpochMs);
  });

  it('should throw error for invalid timestamp inputs', () => {
    expect(() => epochToISO(NaN)).toThrow('Invalid timestamp');
  });

  it('should throw error for invalid ISO format strings', () => {
    expect(() => isoToEpoch('invalid-date')).toThrow('Invalid ISO date string format');
  });
});
