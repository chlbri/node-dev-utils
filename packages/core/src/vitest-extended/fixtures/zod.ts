import { z } from 'zod';

/**
 * Type alias for any Zod schema.
 */
export type Any = z.ZodTypeAny;

/**
 * Converts a Zod schema into a synchronous type-guard validation function.
 *
 * @template | {@linkcode Any} `T` - Zod schema type.
 *
 * @param zod - Zod schema instance.
 *
 * @returns Type guard validation function.
 */
export const transformZodToFunction = <T extends Any>(zod: T) => {
  type Z = z.infer<T>;

  const f = (arg: any): arg is Z => {
    return zod.safeParse(arg).success;
  };

  return f;
};

/**
 * Alias for {@linkcode transformZodToFunction}.
 */
export const transformZTF = transformZodToFunction;

/**
 * Converts a Zod schema into an asynchronous boolean validation function.
 *
 * @param zod - Zod schema instance of type {@linkcode Any}.
 *
 * @returns Async validation function returning a boolean.
 */
export const transformZodToFunctionAsync = (zod: Any) => {
  const f = async (arg: any) => {
    const _zod = await zod.safeParseAsync(arg);
    return _zod.success;
  };

  return f;
};

/**
 * Alias for {@linkcode transformZodToFunctionAsync}.
 */
export const transformZTFAsync = transformZodToFunctionAsync;
