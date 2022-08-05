import { useState } from 'react';

export enum Status {
  INITIAL = "INITIAL",
  FETCHING = "FETCHING",
  COMPLETE = "COMPLETE",
  ERROR = "ERROR",
}
const initState = {
  status: Status.INITIAL,
  value: null,
  error: null,
};

export default function useAsyncData<T>(asyncFn, initData: T | null = null){
  const [state, setState] = useState({ ...initState, value: initData });

  function getter(...params) {
    setState({ ...initState, status: Status.FETCHING });
    asyncFn(...params)
      .then(val => {
        setState({ status: Status.COMPLETE, value: val, error: null });
      })
      .catch(err => {
        setState({ status: Status.ERROR, error: err, value: null });
      });
  }

  return [state, getter] as const;
}