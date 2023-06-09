<template>
	<v-card class="tw-hidden lg:tw-flex tw-z-[100]">
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

				<v-spacer />

				<div class="tw-absolute tw-left-2/4 -tw-translate-x-2/4">
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
                                        <span
                                                class="tw-text-lg tw-font-bold"
                                        >Obtenir un réparateur</span>
								</v-btn>
							</template>
						</announcements-modal>
					</slot>
				</div>

                <div v-if="isContractor" class="tw-mx-2 router hover:tw-text-primary">
                    <router-link :to="{name: 'contractor-announcements'}">
                        Prestatations
                    </router-link>
                </div>

                <div v-if="isAdmin" class="tw-mx-2 router hover:tw-text-primary">
                    <router-link :to="{name: 'admin-announcements'}">
                        Admin
                    </router-link>
                </div>

                <div v-if="isClient" class="tw-mx-2 router hover:tw-text-primary">
                    <router-link :to="{name: 'client-announcements'}">
                        Mon espace
                    </router-link>
                </div>

				<slot name="after">
					<v-menu :location="'bottom'">
						<template v-slot:activator="{ props }">
							<v-btn
								color="primary"
								dark
								v-bind="props"
								class="tw-normal-case tw-text-medium border tw-rounded-full tw-px-2"
								height="50">
								<v-avatar color="surface-variant" size="35">
									<v-img
										v-if="myPP"
										:src="myPP"
										alt="avatar"
										width="35"
										height="35"
										class="tw-rounded-full" />
									<span
										v-else
										class="tw-text-lg tw-font-bold tw-text-primary"
										>?</span
									>
								</v-avatar>
								<span class="tw-mx-2">{{ myUser?.email }}</span>
								<v-icon>mdi-menu</v-icon>
							</v-btn>
						</template>
						<div
							class="tw-bg-white tw-mt-2 tw-mr-2 tw-flex tw-flex-col">
							<router-link
								v-for="item in (items as any[])"
								:to="{ name: item.to }">
								<v-btn
									variant="text"
									class="justify-start text-none tw-font-medium tw-w-full"
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
								class="tw-w-full justify-start text-none"
								height="60"
								size="large"
								color="unset"
								@click="handleDisconnect()">
								Se déconnecter
							</v-btn>
						</div>
					</v-menu>
				</slot>
			</v-app-bar>
		</v-layout>
	</v-card>
</template>

<script setup lang="ts">
import {onMounted, ref, watch} from "vue";
import AnnouncementsModal from "@/components/modal/form/announcements/announcements-modal.vue";
import { useUserStore } from "@/stores/user";
import imageService from "@/services/api/image";
import { storeToRefs } from "pinia";
import { token } from "@/services";
import { useRouter } from "vue-router";

const drawer = ref<boolean>(false);
const userStore = useUserStore();
const { getSelfAllInfos, getSelf, signout } = userStore;
const { currentUser, isAdmin, isContractor, isClient, isConnected } = storeToRefs(userStore);
const { getImage } = imageService;

const myPP = ref();
const myUser = ref();

watch(myUser, async (newVal) => {
    if (newVal) {
        if (myUser?.value?.avatar?.[0]?.id) {
            myPP.value = await getImage(myUser?.value?.avatar?.[0]?.id);
        }
    }
});

const router = useRouter();
const items = ref([{}]);

const handleDisconnect = () => {
	signout();
	router.push({ name: "home-page" });
};

const setMenu = () => {
    if(isAdmin.value) {
        items.value = [
            {
                title: 'Demandes',
                value: 'demandes',
                icon: 'mdi-bookmark-outline',
                to: 'admin-announcements',
            },
            {
                title: 'Utilisateurs',
                value: 'utilisateurs',
                icon: 'mdi-account-outline',
                to: 'admin-users',
            },
            {
                title: 'Notifications',
                value: 'notifications',
                icon: 'mdi-bell-outline',
                to: 'admin-notifications',
            },
            {
                title: 'Messagerie',
                value: 'messagerie',
                icon: 'mdi-message-outline',
                to: 'admin-chat',
            },
            {
                title: 'Compte',
                value: 'compte',
                icon: 'mdi-account-outline',
                to: 'admin-profile',
            },
        ]
    } else if (isContractor.value) {
        items.value = [
            {
                title: 'Mes demandes',
                value: 'mes-demandes',
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
        myUser.value = await getSelfAllInfos();
        setMenu()
	}
});
</script>

<style scoped>
div.router .router-link-active {
    background-color: #4D908E;
    padding: 1rem 0.75rem;
    font-weight: bold;
    color: white;
    border-radius: 1rem;
}
</style>
