import { Nullable } from 'errable';

function round(n: number, decimals?: number): number;
function round(n: Nullable<number>, decimals?: number): Nullable<number>;
function round(n: Nullable<number>, decimals: number = 0) {
  if (n === null) return null;
  const multiplier = Math.pow(10, decimals);
  return Math.round(n * multiplier) / multiplier;
}

export default round;
