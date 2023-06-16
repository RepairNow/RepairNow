<template>
    <v-card class="tw-flex sm:tw-hidden">
        <v-layout>
            <!-- <v-system-bar color="deep-purple darken-3"></v-system-bar> -->
            <v-app-bar
                color="white"
            >
                <div class="mx-4">
                    <v-img
                            src="repairnow-logo-xs.svg"
                            alt="RepairNow logo"
                            width="36"
                            height="36"
                    />
                </div>

                <v-spacer></v-spacer>

                <v-btn
                        rounded
                        color="transparent"
                        class="tw-bg-primary tw-text-white tw-font-medium tw-normal-case"
                        height="50"
                >
                    <v-icon
                        slot="prependIcon"
                        color="white"
                        size="medium"
                        icon="mdi-plus-circle"
                        class="tw-mr-2"
                    />
                    Obtenir un réparateur
                </v-btn>

                <v-spacer></v-spacer>

                <v-btn
                        variant="text"
                        size="large"
                        color="tw-transparent"
                        icon="mdi-menu"
                        @click.stop="drawer = !drawer"
                />
            </v-app-bar>

            <v-navigation-drawer
                v-model="drawer"
                location="bottom"
                class="h-screen tw-z-[2000]"
                :elevation="24"
                temporary
            >
                <div class="tw-flex">
                    <v-spacer />
                    <v-btn
                        @click.stop="drawer = !drawer"
                        icon="mdi-close"
                        color="tw-transparent"
                        class="tw-text-black tw-bg-transparent"
                    />
                </div>
                <div class="tw-flex tw-items-center tw-p-6">
                    <div class="tw-font-bold tw-text-3xl tw-grow">Bonjour X</div>
                    <div>
                        <v-avatar color="surface-variant" size="70"></v-avatar>
                    </div>
                </div>
                <router-link
                        v-for="item in items"
                        :to="{name: item.to}"
                >
                    <v-btn
                            variant="text"
                            class="tw-w-full justify-start text-none tw-font-medium"
                            size="large"
                            color="unset"
                    >
                        <v-icon
                            slot="prependIcon"
                            color="primary"
                            :icon="item.icon"
                            class="tw-mr-2"
                        />
                        {{ item.title }}
                    </v-btn>
                </router-link>
                <v-divider class="tw-border-black"/>
                <v-btn
                        variant="text"
                        class="tw-w-full justify-start text-none tw-font-medium"
                        height="60"
                        size="large"
                        color="unset"
                >
                    Se déconnecter
                </v-btn>
            </v-navigation-drawer>
        </v-layout>
    </v-card>
</template>

<script setup>
import {ref} from "vue";

const props = defineProps({
    items: { type: Array }
})

const drawer = ref(false);

</script>

<style scoped>

</style>