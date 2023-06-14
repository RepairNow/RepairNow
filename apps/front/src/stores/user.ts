import { defineStore } from "pinia";

interface User {
	id: string;
}

export const useUserStore = defineStore("user", () => {
	const user: User = {
		id: "fefefe",
	};

	async function signin() {
		console.log("signin");
	}

	return { user, signin };
});
