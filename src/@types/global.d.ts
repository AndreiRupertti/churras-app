declare global {
  type Nullable<T> = T | null | undefined;
  type JSONValue =
    | string
    | number
    | boolean
    | null
    | { [x: string]: JSONValue }
    | Array<JSONValue>;

  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: string;
      API_URL: string;
    }
  }
}
