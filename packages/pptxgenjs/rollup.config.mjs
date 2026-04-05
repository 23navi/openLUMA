import { createRequire } from "node:module";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";

const require = createRequire(import.meta.url);
const pkg = require("./package.json");
const ts = require("typescript");
const nodeBuiltinsRE = /^node:.*/; /* Regex that matches all Node built-in specifiers */
const tsInclude = ["**/*.ts", "**/*.tsx", "**/*.cts", "**/*.mts"];

export default {
	input: "src/pptxgen.ts",
	output: [
		{
			file: "./dist/pptxgen.js",
			format: "iife",
			name: "PptxGenJS",
			globals: { jszip: "JSZip" },
		},
		{ file: "./dist/pptxgen.cjs.js", format: "cjs", exports: "default" },
		{ file: "./dist/pptxgen.es.js", format: "es" },
	],
	external: [
		nodeBuiltinsRE,
		...Object.keys(pkg.dependencies || {}),
		...Object.keys(pkg.peerDependencies || {}),
	],
	plugins: [
		resolve({ preferBuiltins: true }),
		commonjs(),
		typescript({
			// rollup-plugin-typescript2's default `*.ts+(|x)` globs don't match
			// Rollup's absolute module ids in this toolchain.
			include: tsInclude,
			typescript: ts,
		}),
	]
};
