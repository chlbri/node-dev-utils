/**
 * Asynchronously pauses execution for a given number of milliseconds.
 *
 * @param ms - Delay duration in milliseconds.
 *
 * @returns A promise that resolves after the specified delay.
 */
export const sleep = (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};
