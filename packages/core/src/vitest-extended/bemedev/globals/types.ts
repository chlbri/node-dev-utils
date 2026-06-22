export type Fn<Args extends any[] = any[], R = any> = (...args: Args) => R;

export type RuA = readonly unknown[];

export type Undefiny<T> = T | undefined | null;
