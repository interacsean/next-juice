import axios from "axios";
import Site from "config/Site";
import ifUndefined from "utils/data/ifUndefined/ifUndefined";
import useAsyncData from "../../utils/hooks/useAsyncData"
import handleApiResponse from "./handleApiResponse";

type UseApiConfig<T, U extends {} = {}> = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE',
  payload?: U,
  initialData?: T | null,
}

const axiosFnMap = {
  GET: axios.get,
  POST: axios.post,
  PUT: axios.put,
  DELETE: axios.delete,
}

const axiosDefaultConfig = {}

export default function useApiEndpoint<T>(endpoint: string, config: UseApiConfig<T> = {}) {
  const axiosFn = axiosFnMap[config.method || 'GET'];
  const url = `${Site.API_BASE_URL}/${endpoint}`;
  // query params
  const apiFn = () => ['GET', 'DELETE'].includes(config.method || 'GET')
    ? handleApiResponse(axiosFn(url, { ...axiosDefaultConfig }))
    : handleApiResponse(axiosFn(url, config.payload || {}, { ...axiosDefaultConfig }));

  const [ state, getter ] = useAsyncData(
    apiFn, 
    { data: ifUndefined(config.initialData, null), message: null },
  );

  return [
    {
      ...state,
      value: state.value?.data || null,
      message: state.value?.message || null,
    },
    getter,
  ] as const;
}
