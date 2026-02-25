import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["scripts/cli/index.ts"],
  outDir: "dist",
  format: ["cjs"],
  sourcemap: false,
  clean: true,
  minify: true,
  target: "node18",
});
