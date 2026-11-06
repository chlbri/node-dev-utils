import { defineConfig as pack } from "@bemedev/dev-utils/pack";
import { defineConfig } from "vite-plus";

export default defineConfig({ pack: pack.fast({ clean: true }) });
