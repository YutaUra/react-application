import { createRoot } from "react-dom/client";
import { App } from "./app/_app";

const container = document.getElementById("app");
if (!container) {
	throw new Error(
		"Container<#app> is not found. Please check `index.html` has a div with id app.",
	);
}

createRoot(container).render(<App />);
