import { Nullable } from 'errable';
import curry from '../../functional/curry';

function indexOf_<T>(needle: T, haystack: T[]) {
  const idx = haystack.indexOf(needle);
  return idx === -1 ? null : idx;
}

function indexOf<T>(needle: T): (haystack: T[]) => Nullable<number>;
function indexOf<T>(needle: T, haystack: T[]): Nullable<number>;
function indexOf<T>(this: any, needle: T, haystack?: T[]) {
  return curry(indexOf_).apply(this, arguments);
}

export default indexOf;
