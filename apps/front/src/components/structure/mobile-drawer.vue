<template>
    <v-card class="tw-flex sm:tw-hidden">
        <v-layout>
            <!-- <v-system-bar color="deep-purple darken-3"></v-system-bar> -->
            <v-app-bar
                color="white"
            >
                <slot name="before">
                    <router-link class="mx-4" :to="{name: 'home-page'}">
                        <v-img
                                src="../repairnow-logo-xs.svg"
                                alt="RepairNow logo"
                                width="36"
                                height="36"
                        />
                    </router-link>
                </slot>

                <v-spacer></v-spacer>

                <slot name="center">
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
                </slot>

                <v-spacer></v-spacer>

                <slot name="after">
                    <v-btn
                            variant="text"
                            size="large"
                            color="tw-transparent"
                            icon="mdi-menu"
                            @click.stop="drawer = !drawer"
                    />
                </slot>
            </v-app-bar>

            <slot name="drawer">
                <v-navigation-drawer
                        v-model="drawer"
                        location="bottom"
                        class="h-screen tw-z-[2000]"
                        :elevation="24"
                        temporary
                        :rail="false"
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

                    <slot name="drawer-content">
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
                    </slot>
                </v-navigation-drawer>
            </slot>
        </v-layout>
    </v-card>
</template>

<script setup lang="ts">
import {ref} from "vue";

const props = defineProps({
    items: { type: Array }
})

const drawer = ref(false);

</script>

<style scoped>

</style>