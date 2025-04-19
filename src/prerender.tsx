import { PassThrough } from "node:stream";
import type { ReactNode } from "react";
import { renderToPipeableStream } from "react-dom/server";
import { Router } from "wouter";
import { App } from "./app/_app";

const renderToStringAsync = (children: ReactNode) => {
	return new Promise((resolve, reject) => {
		const stream = renderToPipeableStream(children, {
			onError(error, errorInfo) {
				console.error(error, errorInfo);
				reject(error);
			},
			async onAllReady() {
				const passthrough = new PassThrough();
				const html = stream.pipe(passthrough);
				for await (const element of passthrough) {
					console.log(element);
				}
				resolve(html);
			},
		});
	});
};

type PrerenderOptions = {
	path: string;
};

export const prerender = async ({ path }: PrerenderOptions) => {
	const html = await renderToStringAsync(
		<Router ssrPath={path}>
			<App />
		</Router>,
	);
	return html;
};
