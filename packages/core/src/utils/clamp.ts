/**
 * Restricts a number between a minimum and maximum boundary.
 *
 * @param value - Value to clamp.
 * @param min - Minimum allowed boundary.
 * @param max - Maximum allowed boundary.
 *
 * @returns Clamped value within the range `[min, max]`.
 */
export const clamp = (value: number, min: number, max: number) => {
  return Math.min(Math.max(value, min), max);
};
