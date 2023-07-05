<template>
	<mobile-drawer>
		<template #drawer-content v-if="!isConnected()">
			<div class="tw-bg-white tw-h-full">
				<router-link
					class="tw-text-md tw-py-2 tw-px-4 tw-font-medium tw-truncate tw-flex tw-flex-col hover:tw-bg-primary/20 tw-justify-center"
					color="none"
					stacked
					:to="{ name: 'home-page' }">
					<span> Devenir prestataire </span>
				</router-link>
				<login-form>
					<template #button>
						<span
							class="tw-text-md tw-py-2 tw-px-4 tw-font-medium tw-truncate tw-flex tw-flex-col hover:tw-bg-primary/20 tw-cursor-pointer">
							Connexion
						</span>
					</template>
				</login-form>
				<router-link
					class="tw-text-md tw-py-2 tw-px-4 tw-font-medium tw-truncate tw-flex tw-flex-col hover:tw-bg-primary/20"
					color="none"
					stacked
					:to="{ name: 'register' }">
					<span> Inscription </span>
				</router-link>
			</div>
		</template>
	</mobile-drawer>
</template>

<script setup lang="ts">
import MobileDrawer from "@/components/structure/mobile-drawer.vue";
import { ref } from "vue";
import LoginForm from "@/components/modal/form/session/login-form.vue";
import {useUserStore} from "@/stores/user";

const userStore = useUserStore()
const {isAdmin, isContractor, isConnected} = userStore
</script>
