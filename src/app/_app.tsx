import { Route, Switch } from "wouter";
import { Index } from "./index";
import { Sample } from "./sample";

export const App = () => {
	return (
		<Switch>
			<Route path="/" component={Index} />
			<Route path="/sample" component={Sample} />
		</Switch>
	);
};
