import { mkdir, readFile, unlink, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
const require = createRequire(import.meta.url);

type Prerender = typeof import("../src/prerender.jsx");
const { prerender } = require("../dist/prerender") as Prerender;

const routes = [{ path: "/" }, { path: "/sample" }];

const main = async () => {
	const TEMPLATE = await readFile(
		join(import.meta.dirname, "../dist/index.html"),
		"utf8",
	);
	for (const route of routes) {
		const html = await prerender({ path: route.path });

		const fileName =
			route.path === "/" ? "index.html" : `${route.path}/index.html`;
		const filePath = join(import.meta.dirname, `../dist/${fileName}`);
		await mkdir(dirname(filePath), { recursive: true });
		await writeFile(filePath, TEMPLATE.replace("<!--ssr-outlet-->", html));
	}

	await unlink(join(import.meta.dirname, "../dist/prerender.js"));
};

main();
