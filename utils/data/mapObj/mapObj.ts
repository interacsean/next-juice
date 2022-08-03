function _mapObj<T, U>(
  mapFn: (val: T, key: string) => U,
  obj: Record<string, T>,
): Record<string, U> {
  return Object.keys(obj).reduce(
    (result: Record<string, U>, key: string): Record<string, U> => {
      // @ts-ignore
      // eslint-disable-next-line
      result[key] = mapFn(obj[key], key);
      return result;
    },
    {},
  );
}

function mapObj<T, U>(
  mapFn: (val: T, key: string) => U,
  obj: Record<string, T>,
): Record<string, U>;
function mapObj<T, U>(
  mapFn: (val: T, key: string) => U,
): (obj: Record<string, T>) => Record<string, U>;
function mapObj<T, U>(
  this: any,
  mapFn: (val: T, key: string) => U,
  obj?: Record<string, T>,
) {
  if (obj) return _mapObj(mapFn, obj);
  else return (obj: Record<string, T>) => _mapObj(mapFn, obj);
}

export default mapObj;
