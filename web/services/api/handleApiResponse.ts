import { AxiosResponse } from "axios";
import validateResponse from "web/services/api/validateResponse";
import { ApiResponse } from "types/core/ApiResponse";

function handleApiResponse<T = any, D = any>(
  axiosRequest: Promise<AxiosResponse<T, D>>,
): ApiResponse<any> | Promise<ApiResponse<any>> {
  try {
    return axiosRequest
      .then((response) => response.data)
      .then((responseData) => {
        if (validateResponse(responseData)) {
          return responseData;
        } else {
          throw Error("Invalid response");
        }
      });
  } catch (e) {
    if (validateResponse(e)) {
      return e;
    }
    throw Error("Invalid error response");
  }
}

export default handleApiResponse;
