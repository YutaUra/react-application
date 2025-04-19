import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig(({ mode, command }) => {
	if (command === "build" && mode === "prerender") {
		return {
			plugins: [react()],
			ssr: {
				noExternal: true,
			},
			build: {
				ssr: true,
				emptyOutDir: false,
				lib: {
					entry: "src/prerender.tsx",
					name: "prerender",
					formats: ["es"],
				},
				rollupOptions: {
					output: {
						inlineDynamicImports: true,
					},
				},
			},
		};
	}
	return {
		plugins: [react()],
	};
});
