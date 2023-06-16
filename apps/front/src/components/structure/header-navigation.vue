<template>
    <v-card class="tw-hidden sm:tw-flex tw-z-[100]">
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
                        class="tw-bg-primary tw-text-white tw-normal-case"
                        height="50"
                >
                    <v-icon
                            slot="prependIcon"
                            color="white"
                            size="large"
                            icon="mdi-plus-circle"
                            class="tw-mr-2"
                    />
                    <span class="tw-text-lg tw-font-bold">Obtenir un réparateur</span>
                </v-btn>

                <v-spacer></v-spacer>

                <v-menu :location="'bottom'">
                    <template v-slot:activator="{ props }">
                        <v-btn
                            color="primary"
                            dark
                            v-bind="props"
                            class="tw-normal-case tw-text-medium border tw-rounded-full tw-px-2"
                            height="50"
                        >
                            <v-avatar color="surface-variant" size="35"></v-avatar>
                            <span class="tw-mx-2">Antoine</span>
                            <v-icon>mdi-menu</v-icon>
                        </v-btn>
                    </template>
                    <div class="tw-bg-white tw-mt-2 tw-mr-2 tw-flex tw-flex-col">
                        <router-link
                                v-for="item in items"
                                :to="{name: item.to}"
                        >
                            <v-btn
                                    variant="text"
                                    class=" justify-start text-none tw-font-medium"
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
                                class="tw-w-full justify-start text-none"
                                height="60"
                                size="large"
                                color="unset"
                        >
                            Se déconnecter
                        </v-btn>
                    </div>
                </v-menu>
            </v-app-bar>
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