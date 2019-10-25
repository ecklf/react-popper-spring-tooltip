import pkg from "./package.json";
import typescript from "rollup-plugin-typescript2";
import { terser } from "rollup-plugin-terser";

export default {
  input: "src/index.ts", // our source file
  output: [
    {
      file: pkg.main,
      format: "cjs"
    },
    {
      file: pkg.module,
      format: "es" // the preferred format
    }
  ],
  external: ["react", "react-dom", "react-popper", "react-spring"],
  plugins: [
    typescript(),
    terser() // minifies generated bundles
  ]
};
