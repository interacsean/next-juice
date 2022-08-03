import { useCallback } from "react";

function usePartialCallback<A extends any[], R>(
  callbackFunction: (...args: A) => R,
  args: A
) {
  return useCallback(() => callbackFunction(...args), args);
}

export default usePartialCallback;
