<template>
	<v-card class="tw-flex lg:tw-hidden">
		<v-layout>
			<!-- <v-system-bar color="deep-purple darken-3"></v-system-bar> -->
			<v-app-bar color="white">
				<slot name="before">
					<router-link class="mx-4" :to="{ name: 'home-page' }">
						<v-img
							src="../repairnow-logo-xs.svg"
							alt="RepairNow logo"
							width="36"
							height="36" />
					</router-link>
				</slot>

				<v-spacer></v-spacer>

				<slot name="center">
					<announcements-modal>
						<template #button>
							<v-btn
								rounded
								color="transparent"
								class="tw-bg-primary tw-text-white tw-normal-case"
								height="50">
								<v-icon
									slot="prependIcon"
									color="white"
									size="large"
									icon="mdi-plus-circle"
									class="tw-mr-2" />
								<span class="tw-text-base tw-font-bold"
									>Obtenir un réparateur</span
								>
							</v-btn>
						</template>
					</announcements-modal>
				</slot>

				<v-spacer></v-spacer>

				<slot name="after">
					<v-btn
						variant="text"
						size="large"
						color="tw-transparent"
						icon="mdi-menu"
						@click.stop="drawer = !drawer" />
				</slot>
			</v-app-bar>

			<slot name="drawer">
				<v-dialog
					v-model="drawer"
					class="h-screen tw-z-[2000] tw-bg-white"
					fullscreen
					transition="dialog-bottom-transition"
					:scrim="false">
					<div class="tw-flex tw-bg-white">
						<v-spacer />
						<v-btn
							@click.stop="drawer = !drawer"
							icon="mdi-close"
							color="tw-transparent"
							class="tw-text-black tw-bg-transparent" />
					</div>

					<!-- Displayed only if user is connected -->
					<slot name="drawer-content">
						<div class="tw-flex tw-items-center tw-p-6">
							<div class="tw-font-bold tw-text-3xl tw-grow">
								Bonjour X
							</div>
							<div>
								<v-avatar color="surface-variant" size="70" />
							</div>
						</div>
						<router-link
							v-for="item in (items as any[])"
							:to="{ name: item.to }">
							<v-btn
								variant="text"
								class="tw-w-full justify-start text-none tw-font-medium"
								size="large"
								color="unset">
								<v-icon
									slot="prependIcon"
									color="primary"
									:icon="item.icon"
									class="tw-mr-2" />
								{{ item.title }}
							</v-btn>
						</router-link>
						<v-divider class="tw-border-black" />
						<v-btn
							variant="text"
							class="tw-w-full justify-start text-none tw-font-medium"
							height="60"
							size="large"
							color="unset">
							Se déconnecter
						</v-btn>
					</slot>
				</v-dialog>
			</slot>
		</v-layout>
	</v-card>
</template>

<script setup lang="ts">
import { ref } from "vue";
import AnnouncementsModal from "@/components/modal/form/announcements/announcements-modal.vue";

const props = defineProps({
	items: { type: Array },
});

const drawer = ref(false);
</script>

<style scoped></style>
