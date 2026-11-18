import { defineConfig } from "tsup";
import { copyFileSync } from "node:fs";

export default defineConfig({
  entry: ["src/index.ts", "src/tailwind-preset.ts"],
  format: ["esm"],
  dts: true,
  sourcemap: true,
  clean: true,
  target: "es2022",
  external: ["react", "react-dom"],
  onSuccess: async () => {
    copyFileSync("src/tokens.css", "dist/tokens.css");
    copyFileSync("src/theme.css", "dist/theme.css");
    copyFileSync("src/shadcn.css", "dist/shadcn.css");
    copyFileSync("src/fonts.css", "dist/fonts.css");
    copyFileSync("src/styles.css", "dist/styles.css");
  },
});
