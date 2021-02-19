import { alphanumeric as alphanumericDictionary } from 'nanoid-dictionary';
import { customAlphabet as nanoid } from 'nanoid';

export const generateRandomInt = (min: number, max: number): number => {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const generateAlphanumericId = (size: number): string =>
  nanoid(alphanumericDictionary, size)();
