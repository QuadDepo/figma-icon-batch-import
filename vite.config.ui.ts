import { defineConfig } from "vite";
import path from "node:path";
import { viteSingleFile } from "vite-plugin-singlefile";
import react from "@vitejs/plugin-react";
import richSvg from "vite-plugin-react-rich-svg";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
	plugins: [react(), richSvg(), viteSingleFile()],
	root: path.resolve("src/ui"),
	build: {
		minify: mode === "production",
		cssMinify: mode === "production",
		sourcemap: mode !== "production" ? "inline" : false,
		emptyOutDir: false,
		outDir: path.resolve("dist"),
		rollupOptions: {
			input: path.resolve("src/ui/index.html"),
		},
	},
	css: {
		postcss: "./postcss.config.js",
	},
	resolve: {
		alias: {
			"@common": path.resolve("src/common"),
			"@ui": path.resolve("src/ui"),
		},
	},
}));
