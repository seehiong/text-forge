//src/utils/time.ts

export const epochToISO = (epoch: number, isMs: boolean = false): string => {
  const ms = isMs ? epoch : epoch * 1000;
  if (isNaN(ms)) throw new Error('Invalid timestamp');
  return new Date(ms).toISOString();
};

export const epochToUTC = (epoch: number, isMs: boolean = false): string => {
  const ms = isMs ? epoch : epoch * 1000;
  if (isNaN(ms)) throw new Error('Invalid timestamp');
  return new Date(ms).toUTCString();
};

export const epochToLocal = (epoch: number, isMs: boolean = false): string => {
  const ms = isMs ? epoch : epoch * 1000;
  if (isNaN(ms)) throw new Error('Invalid timestamp');
  return new Date(ms).toString();
};

export const isoToEpoch = (iso: string): { seconds: number; milliseconds: number } => {
  const date = new Date(iso);
  const ms = date.getTime();
  if (isNaN(ms)) {
    throw new Error('Invalid ISO date string format');
  }
  return {
    seconds: Math.floor(ms / 1000),
    milliseconds: ms
  };
};
