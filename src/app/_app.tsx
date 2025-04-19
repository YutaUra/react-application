import { lazy } from "react";
import { Route, Switch } from "wouter";

const Index = lazy(() => import("./index"));
const Sample = lazy(() => import("./sample"));

export const App = () => {
	return (
		<Switch>
			<Route path="/" component={Index} />
			<Route path="/sample" component={Sample} />
		</Switch>
	);
};
