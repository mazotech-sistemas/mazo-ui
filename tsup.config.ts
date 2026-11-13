import { defineConfig } from "tsup";
import { copyFileSync } from "node:fs";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  dts: true,
  sourcemap: true,
  clean: true,
  target: "es2022",
  external: ["react", "react-dom"],
  onSuccess: async () => {
    copyFileSync("src/tokens.css", "dist/tokens.css");
    copyFileSync("src/theme.css", "dist/theme.css");
  },
});
