import mapObj from "../mapObj/mapObj";

export default <T, O extends {}>(objMap: O, key: string = "key") =>
  mapObj((obj: T, k) => ({
    [key]: k,
    ...obj,
  }))(objMap) as Record<keyof O, T>;
