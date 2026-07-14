export type Fn<Args extends unknown[], Return = void> = (
  ...args: Args
) => Return;

export type ToArray_F = <T>(value?: T | T[]) => T[];
