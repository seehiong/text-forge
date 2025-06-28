import { v1 as uuidv1, v4 as uuidv4 } from 'uuid';

export const generateUUID = (version: 1 | 4 = 4): string => {
  return version === 1 ? uuidv1() : uuidv4();
};

export const generatePassword = (
  length: number = 16,
  options: {
    lowercase?: boolean;
    uppercase?: boolean;
    numbers?: boolean;
    symbols?: boolean;
  } = {}
): string => {
  const {
    lowercase = true,
    uppercase = true,
    numbers = true,
    symbols = true
  } = options;

  let charset = '';
  if (lowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
  if (uppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (numbers) charset += '0123456789';
  if (symbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';

  if (charset === '') {
    throw new Error('At least one character type must be selected');
  }

  let password = '';
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);

  for (let i = 0; i < length; i++) {
    password += charset[array[i] % charset.length];
  }

  return password;
};