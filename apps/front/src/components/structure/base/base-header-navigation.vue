<template>
    <header-navigation
        :items="items"
    >
        <template #after v-if="true">
            <div class="tw-flex tw-mr-4">
                <router-link
                        class="tw-text-md tw-py-2 tw-px-4 tw-rounded-full tw-font-medium tw-truncate tw-flex tw-flex-col tw-items-center hover:tw-bg-primary/20 tw-h-full tw-justify-center"
                        color="none"
                        stacked
                        :to="{name: 'become-contractor'}"
                >
                    <span>
                        Devenir prestataire
                    </span>
                </router-link>
                <login-form>
                    <template #button>
                        <span
                            class="tw-text-md tw-py-2 tw-px-4 tw-rounded-full tw-font-medium tw-truncate tw-flex tw-flex-col tw-items-center hover:tw-bg-primary/20 tw-h-full tw-justify-center tw-cursor-pointer"
                        >
                            Connexion
                        </span>
                    </template>
                </login-form>
                <router-link
                        class="tw-text-md tw-py-2 tw-px-4 tw-rounded-full tw-font-medium tw-truncate tw-flex tw-flex-col tw-items-center hover:tw-bg-primary/20 tw-h-full tw-justify-center"
                        color="none"
                        stacked
                        :to="{name: 'register'}"
                >
                    <span>
                        Inscription
                    </span>
                </router-link>
            </div>
        </template>
    </header-navigation>
</template>

<script setup lang="ts">
import HeaderNavigation from "@/components/structure/header-navigation.vue";
import {ref} from "vue";
import LoginForm from "@/components/modal/form/session/login-form.vue";

const items = ref([
    {
        title: 'Devenir prestataire',
        value: 'devenir-prestataire',
        to: 'become-contractor',
    },
    {
        title: 'Inscription',
        value: 'inscription',
        to: 'register',
    },
])
</script>