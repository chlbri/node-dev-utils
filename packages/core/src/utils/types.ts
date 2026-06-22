export type Fn<Args extends unknown[], Return = void> = (
  ...args: Args
) => Return;
