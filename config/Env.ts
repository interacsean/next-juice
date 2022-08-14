import ifUndefined from "utils/data/ifUndefined/ifUndefined";

const IS_PROD = process?.env?.NODE_ENV === "production";
const IS_DEV = process?.env?.NODE_ENV === "development";
const IS_TEST = [process?.env?.NODE_ENV, undefined].indexOf("test") >= 0;

export default {
  ENABLE_DEBUG: IS_DEV,
  NODE_ENV: ifUndefined(process?.env?.NODE_ENV, "test"),
  IS_PROD,
  IS_DEV,
  IS_TEST,
};
