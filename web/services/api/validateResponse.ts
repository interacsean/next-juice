import { ApiResponse } from "types/core/ApiResponse";
import { StrRecord } from "types/util/StrRecord";

function isStrRecord(variable: unknown): variable is StrRecord<any> {
  return typeof variable === "object";
}

function validateResponse(
  responseData: unknown,
): responseData is ApiResponse<any> {
  return (
    isStrRecord(responseData) &&
    responseData.data !== undefined &&
    typeof responseData.message === "string" &&
    ["undefined", "object"].includes(typeof responseData.errors)
  );
}

export default validateResponse;
