import Home from "../pages/index.vue";
import Account from "../pages/account.vue";
import Login from "../pages/login.vue";
import Register from "../pages/register.vue";

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
	{
		name: "login",
		path: "/login",
		component: Login,
	},
	{
		name: "register",
		path: "/register",
		component: Register,
	},
];

export default routes;
