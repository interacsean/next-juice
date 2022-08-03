import { rand } from 'utils/data/rand/rand';

export const randElementInArray = <T>(arr: T[]): T => {
  return arr[rand(0, arr.length - 1)];
};