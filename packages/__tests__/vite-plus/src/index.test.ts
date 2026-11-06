import { existsSync } from "node:fs";

import { sum } from "./index";

describe("vite-plus pack tests", () => {
  test("#01 => sums two numbers", () => {
    expect(sum(1, 2)).toBe(3);
  });

  test("#02 => emits ESM output", () => {
    expect(existsSync("lib/index.js")).toBe(true);
  });

  test("#03 => emits ESM map output", () => {
    expect(existsSync("lib/index.js.map")).toBe(true);
  });

  test("#04 => emits declaration output", () => {
    expect(existsSync("lib/index.d.ts")).toBe(true);
  });
});
