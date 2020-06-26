interface Options {
  dir?: string;
  mode?: string;
}

interface ParseSuccess {
  error: null;
  parsed: { [props: string]: string; };
}

interface ParseError {
  error: Error;
  parsed: null
}

declare function loadEnv(options?: Options): ParseSuccess | ParseError;

export { loadEnv };
