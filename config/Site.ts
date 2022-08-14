import Env from "./Env";
import ensureEnvVarExists from "utils/data/ensureEnvVarExists";

if (!Env.IS_TEST) {
  ensureEnvVarExists(["NEXT_PUBLIC_API_BASE_URL"], {
    NEXT_PUBLIC_API_BASE_URL: process?.env?.NEXT_PUBLIC_API_BASE_URL,
  });
}
export default {
  API_BASE_URL: process?.env?.NEXT_PUBLIC_API_BASE_URL || "/api",
  STATIC_URL: process?.env?.NEXT_PUBLIC_STATIC_URL || "",
  // e.g.:
  PASSWORD_REQUIREMENT_REGEX: new RegExp("^(?=.*?[A-Za-zd])(?=.*?[0-9]).{8,}$"),
};
