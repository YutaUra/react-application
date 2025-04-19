import { PassThrough } from "node:stream";
import type { ReactNode } from "react";
import { renderToPipeableStream } from "react-dom/server";
import { Router } from "wouter";
import { App } from "./app/_app";

const renderToStringAsync = (children: ReactNode) => {
	return new Promise<string>((resolve, reject) => {
		const stream = renderToPipeableStream(children, {
			onError(error, errorInfo) {
				console.error(error, errorInfo);
				reject(error);
			},
			async onAllReady() {
				const passthrough = new PassThrough();
				stream.pipe(passthrough);
				let html = "";
				for await (const chunk of passthrough) {
					if (chunk instanceof Buffer) {
						html += chunk.toString("utf8");
					} else {
						throw new Error("Unexpected stream element");
					}
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
