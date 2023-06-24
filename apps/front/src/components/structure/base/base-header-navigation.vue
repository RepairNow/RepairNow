<template>
	<header-navigation :items="items">
		<template #after v-if="true">
			<div class="tw-flex tw-mr-4">
				<router-link
					class="tw-text-md tw-py-2 tw-px-4 tw-rounded-full tw-font-medium tw-truncate tw-flex tw-flex-col tw-items-center hover:tw-bg-primary/20 tw-h-full tw-justify-center"
					color="none"
					stacked
					:to="{ name: 'become-contractor' }">
					<span> Devenir prestataire </span>
				</router-link>
				<login-form v-if="currentUser === null">
					<template #button>
						<span
							class="tw-text-md tw-py-2 tw-px-4 tw-rounded-full tw-font-medium tw-truncate tw-flex tw-flex-col tw-items-center hover:tw-bg-primary/20 tw-h-full tw-justify-center tw-cursor-pointer">
							Connexion
						</span>
					</template>
				</login-form>
				<router-link
					v-if="currentUser === null"
					class="tw-text-md tw-py-2 tw-px-4 tw-rounded-full tw-font-medium tw-truncate tw-flex tw-flex-col tw-items-center hover:tw-bg-primary/20 tw-h-full tw-justify-center"
					color="none"
					stacked
					:to="{ name: 'register' }">
					<span> Inscription </span>
				</router-link>
			</div>

			<v-menu v-if="currentUser !== null">
				<template v-slot:activator="{ props }">
					<v-btn color="primary" v-bind="props">
						{{ currentUser?.email }}
					</v-btn>
				</template>
				<v-list>
					<v-list-item @click="handleDisconnect()">
						<v-list-item-title>se déconnecter</v-list-item-title>
					</v-list-item>
				</v-list>
			</v-menu>
		</template>
	</header-navigation>
</template>

<script setup lang="ts">
import HeaderNavigation from "@/components/structure/header-navigation.vue";
import { ref } from "vue";
import LoginForm from "@/components/modal/form/session/login-form.vue";
import { onMounted } from "vue";
import { getCookieFromDocument } from "@/cookiesUtils";

// TODO: Use User from store (set the store value when sign in)
const currentUser = ref<{ email: string; firstname?: string } | null>(null);

// On est censé stocker le user dans le store au moment du sign in mais j'arrive pas à la récupérer
// const userStore = useUserStore();
// const { user } = storeToRefs(userStore);

const handleDisconnect = () => {
	currentUser.value = null;
	document.cookie =
		"access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
};

onMounted(async () => {
	const token = getCookieFromDocument("access_token");
	if (token) {
		const res = await fetch("http://localhost:3000/me", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${getCookieFromDocument(
					"access_token"
				)} `,
			},
		});
		res.json().then((data) => {
			currentUser.value = data;
		});
	}
});

const items = ref([
	{
		title: "Devenir prestataire",
		value: "devenir-prestataire",
		to: "become-contractor",
	},
	{
		title: "Inscription",
		value: "inscription",
		to: "register",
	},
]);
</script>
