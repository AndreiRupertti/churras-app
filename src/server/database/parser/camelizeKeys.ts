import camelCase from "lodash.camelcase";

type Obj = Record<string, unknown>;

export const camelizeKeys = (obj: Obj | Obj[]): Obj | Obj[] => {
  if (Array.isArray(obj)) {
    return obj.map((v) => camelizeKeys(v)) as Obj[];
  } else if (obj != null && obj.constructor === Object) {
    return Object.keys(obj).reduce(
      (result, key) => ({
        ...result,
        [camelCase(key)]: camelizeKeys(obj[key] as Obj),
      }),
      {} as Record<string, unknown>
    );
  }
  return obj;
};
