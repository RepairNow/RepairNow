<template>
    <mobile-drawer
        :items="items"
    >
        <template #drawer-content v-if="true">
            <router-link
                    class="tw-text-md tw-py-2 tw-px-4 tw-font-medium tw-truncate tw-flex tw-flex-col hover:tw-bg-primary/20 tw-justify-center"
                    color="none"
                    stacked
                    :to="{name: 'home-page'}"
            >
                <span>
                    Devenir prestataire
                </span>
            </router-link>
            <login-form>
                <template #button>
                    <span
                            class="tw-text-md tw-py-2 tw-px-4 tw-font-medium tw-truncate tw-flex tw-flex-col hover:tw-bg-primary/20 tw-cursor-pointer"
                    >
                        Connexion
                    </span>
                </template>
            </login-form>
            <router-link
                    class="tw-text-md tw-py-2 tw-px-4 tw-font-medium tw-truncate tw-flex tw-flex-col hover:tw-bg-primary/20"
                    color="none"
                    stacked
                    :to="{name: 'register'}"
            >
                <span>
                    Inscription
                </span>
            </router-link>
        </template>
    </mobile-drawer>
</template>

<script setup lang="ts">
import MobileDrawer from "@/components/structure/mobile-drawer.vue";
import {ref} from "vue";
import LoginForm from "@/components/modal/form/session/login-form.vue";

const items = ref([
    {
        title: 'Devenir prestataire',
        value: 'devenir-prestataire',
        to: 'home-page',
    },
    {
        title: 'Inscription',
        value: 'inscription',
        to: 'register',
    },
])
</script>