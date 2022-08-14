import { ApiResponse } from "types/core/ApiResponse";
import ifUndefined from "utils/data/ifUndefined/ifUndefined";

interface DataOrErrors<T> {
  data?: T;
  errors?: string[];
}

function createResponse<T>(
  message: string,
  { data, errors }: DataOrErrors<T>,
): ApiResponse<T> {
  return {
    message,
    data: ifUndefined(data, null),
    errors: ifUndefined(errors, []),
  };
}

export default createResponse;
