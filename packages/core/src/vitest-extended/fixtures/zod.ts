import { z } from 'zod';

export type Any = z.ZodTypeAny;

export const transformZodToFunction = <T extends Any>(zod: T) => {
  type Z = z.infer<T>;

  const f = (arg: any): arg is Z => {
    return zod.safeParse(arg).success;
  };

  return f;
};

export const transformZTF = transformZodToFunction;

export const transformZodToFunctionAsync = (zod: Any) => {
  const f = async (arg: any) => {
    const _zod = await zod.safeParseAsync(arg);
    return _zod.success;
  };

  return f;
};

export const transformZTFAsync = transformZodToFunctionAsync;
