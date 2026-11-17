import { existsSync, readFileSync, writeFileSync } from "fs";
import { dirname, relative, resolve } from "path";
import remapping from "@ampproject/remapping";
import { globSync } from "glob";

const JS = /\.(c|m)?js$/;

export const sourcemaps = ({ dir = "lib", sourcemap = true } = {}) => ({
  name: "bemedev-chain-sourcemaps",
  closeBundle: {
    order: "post" as const,
    handler: () => {
      if (!sourcemap) return;
      const outDir = resolve(process.cwd(), dir);

      for (const mapFile of globSync(`${outDir}/**/*.map`, { nodir: true })) {
        const base = dirname(mapFile);
        const input = JSON.parse(readFileSync(mapFile, "utf8"));
        const sources: string[] = input.sources ?? [];
        if (!sources.some((s) => JS.test(s))) continue;

        const composed = remapping(input, (source) => {
          if (!JS.test(source)) return null;
          const file = `${resolve(base, source)}.map`;
          return existsSync(file)
            ? JSON.parse(readFileSync(file, "utf8"))
            : null;
        });

        composed.sources = composed.sources
          .filter((s) => s !== null)
          .map((s) => (s.startsWith("/") ? relative(base, s) : s));

        writeFileSync(mapFile, JSON.stringify(composed));
      }
    },
  },
});
