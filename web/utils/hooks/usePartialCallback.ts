import { useCallback } from "react";

function usePartialCallback<A extends any[], B extends any[], R>(
  callbackFunction: (...args: [...A, ...B]) => R,
  args: A,
) {
  return useCallback(
    (...cbArgs: B) => callbackFunction(...args, ...cbArgs),
    args,
  );
}

export default usePartialCallback;
