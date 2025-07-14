import { defineConfig } from "tsup";

export default defineConfig({
  dts: true,
  entry: {
    ".": "src/server.ts",
  },
  format: ["cjs", "esm"],
});
