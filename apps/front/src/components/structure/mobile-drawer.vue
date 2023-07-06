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
						<div class="tw-bg-white tw-h-full">
							<div class="tw-flex tw-items-center tw-p-6">
								<div class="tw-font-bold tw-text-3xl tw-grow">
									Bonjour {{ myUser?.firstname }}
								</div>
								<div>
									<v-avatar color="surface-variant" size="70">
										<v-img
											v-if="myPP"
											:src="myPP"
											alt="Profile picture"
											width="70"
											height="70"
											class="tw-object-cover" />
										<span v-else>{{
											getInitialsFromFirstnameAndLastname(
												myUser?.firstname,
												myUser?.lastname
											)
										}}</span>
									</v-avatar>
								</div>
							</div>
							<router-link
								v-for="item in (items as any[])"
                                @click="drawer = false"
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
								color="unset"
                                @click="() => {
                                    signout()
                                    drawer = false
                                    setMenu()
                                }"
                            >
								Se déconnecter
							</v-btn>
						</div>
					</slot>
				</v-dialog>
			</slot>
		</v-layout>
	</v-card>
</template>

<script setup lang="ts">
import {onMounted, ref, watch} from "vue";
import AnnouncementsModal from "@/components/modal/form/announcements/announcements-modal.vue";
import { useUserStore } from "@/stores/user";
import imageService from "@/services/api/image";
import { token } from "@/services";
import {storeToRefs} from "pinia";
const userStore = useUserStore();

const { getSelfAllInfos, getSelf, signout } = userStore;
const { currentUser, isAdmin, isContractor, isClient, isConnected } = storeToRefs(userStore);
const { getImage } = imageService;

const myUser = ref();
const myPP = ref();

onMounted(async () => {
	if (token) {
		myUser.value = await getSelfAllInfos();
	}
});

watch(myUser, async (newVal) => {
	if (newVal) {
		if (newVal.avatar?.[0]?.id) {
			myPP.value = await getImage(newVal.avatar?.[0]?.id);
		}
	}
});

const getInitialsFromFirstnameAndLastname = (
	firstname: string,
	lastname: string
) => {
	if (!firstname || !lastname) return;
	return `${firstname[0].toUpperCase()}${lastname[0].toUpperCase()}`;
};

const drawer = ref(false);
const items = ref([{}])

const setMenu = () => {
    if (isContractor.value) {
        items.value = [
            {
                title: 'Les demandes',
                value: 'les-demandes',
                icon: 'mdi-bookmark-outline',
                to: 'contractor-announcements',
            },
            {
                title: 'Notifications',
                value: 'notifications',
                icon: 'mdi-bell-outline',
                to: 'contractor-notifications',
            },
            {
                title: 'Messagerie',
                value: 'messagerie',
                icon: 'mdi-message-outline',
                to: 'contractor-chat',
            },
            {
                title: 'Compte',
                value: 'compte',
                icon: 'mdi-account-outline',
                to: 'contractor-profile',
            },
        ]
    } else if (isClient.value) {
        items.value = [
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
    }
}

watch(isClient, () => {
    setMenu()
})

onMounted(async () => {
    if (token) {
        //await getSelf();
        setMenu()
    }
})
</script>

<style scoped></style>
