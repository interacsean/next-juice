import useAsyncData from "./useAsyncData"

export default function useApiEndpoint<T>(asyncFn, initData: T | null = null) {
  const [ state, getter ] = useAsyncData(asyncFn, { data: initData, message: null });

  return [
    {
      ...state,
      value: state.value?.data || null,
      message: state.value?.message || null,
    },
    getter,
  ] as const;
}