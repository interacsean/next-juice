import { StrRecord } from "types/util/StrRecord";

const buildQueryString = (params: StrRecord<string | number>) =>
  Object.keys(params)
    .map((k) => {
      const v = params[k];
      return k && v && encodeURIComponent(k) + "=" + encodeURIComponent(v);
    })
    .join("&");

export default buildQueryString;
