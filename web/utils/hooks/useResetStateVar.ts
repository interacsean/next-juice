import { useEffect } from 'react';
import { Nullable } from 'errable';
import { Optional } from 'errable';

export default function useResetStateVar<S>(
  updateStateFn: (k: keyof S, v: S[keyof S]) => void,
  keyName: keyof S,
  val: S[keyof S],
) {
  return useEffect(() => {
    updateStateFn(keyName, val);
  }, [updateStateFn, keyName, val]);
}
