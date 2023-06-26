<template>
	<header-navigation :items="currentUser === null ? items : itemsConnected">
		<template #after v-if="currentUser === null">
			<div class="tw-flex tw-mr-4">
				<router-link
					class="tw-text-md tw-py-2 tw-px-4 tw-rounded-full tw-font-medium tw-truncate tw-flex tw-flex-col tw-items-center hover:tw-bg-primary/20 tw-h-full tw-justify-center"
					color="none"
					stacked
					:to="{ name: 'become-contractor' }">
					<span> Devenir prestataire </span>
				</router-link>
				<login-form>
					<template #button>
						<span
							class="tw-text-md tw-py-2 tw-px-4 tw-rounded-full tw-font-medium tw-truncate tw-flex tw-flex-col tw-items-center hover:tw-bg-primary/20 tw-h-full tw-justify-center tw-cursor-pointer">
							Connexion
						</span>
					</template>
				</login-form>
				<router-link
					class="tw-text-md tw-py-2 tw-px-4 tw-rounded-full tw-font-medium tw-truncate tw-flex tw-flex-col tw-items-center hover:tw-bg-primary/20 tw-h-full tw-justify-center"
					color="none"
					stacked
					:to="{ name: 'register' }">
					<span> Inscription </span>
				</router-link>
			</div>
		</template>
	</header-navigation>
</template>

<script setup lang="ts">
import HeaderNavigation from "@/components/structure/header-navigation.vue";
import { ref } from "vue";
import LoginForm from "@/components/modal/form/session/login-form.vue";
import {useUserStore} from "@/stores/user";
import {storeToRefs} from "pinia";

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

const itemsConnected = ref([
    {
        title: 'Mes demandes',
            value: 'mes-demandes',
        icon: 'mdi-bookmark-outline',
        to: 'client-announcements',
    },
    {
        title: 'Notifications',
            value: 'notifications',
        icon: 'mdi-bell-outline',
        to: 'client-notifications',
    },
    {
        title: 'Messagerie',
            value: 'messagerie',
        icon: 'mdi-message-outline',
        to: 'client-chats',
    },
    {
        title: 'Compte',
            value: 'compte',
        icon: 'mdi-account-outline',
        to: 'client-profile',
    },
    ]
)

const userStore = useUserStore()
const {currentUser} = storeToRefs(userStore)
</script>
