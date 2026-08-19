/**
 * Generic function type signature.
 *
 * @template | {@linkcode any[]} `Args` - Function arguments tuple type.
 * @template `R` - Return type.
 */
export type Fn<Args extends any[] = any[], R = any> = (...args: Args) => R;

/**
 * Composite function type combined with additional properties.
 *
 * @template | {@linkcode Fn} `Main` - Base function type.
 * @template | {@linkcode object} `Tr` - Extension properties object type.
 */
export type FnBasic<Main extends Fn, Tr extends object> = Tr & Main;

/**
 * Readonly unknown array alias.
 */
export type RuA = readonly unknown[];

/**
 * Nullable or undefinable type wrapper.
 *
 * @template `T` - Inner type.
 */
export type Undefiny<T> = T | undefined | null;
