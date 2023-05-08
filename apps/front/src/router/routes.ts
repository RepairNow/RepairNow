import Home from "../pages/index.vue";
import Account from "../pages/account.vue";

const routes = [
	{
		name: "home",
		path: "/",
		component: Home,
	},
	{
		name: "account",
		path: "/account",
		component: Account,
	},
];

export default routes;
