<template>
    <header-navigation
        :items="items"
    >
        <template #after v-if="true">
            <div class="tw-flex tw-mr-4">
                <router-link
                        v-for="item in items"
                        class="tw-text-md tw-py-2 tw-px-4 tw-rounded-full tw-font-medium tw-truncate tw-flex tw-flex-col tw-items-center hover:tw-bg-primary/20 tw-h-full tw-justify-center"
                        color="none"
                        stacked
                        :to="{name: item.to}"
                >
                    <span>
                        {{ item.title }}
                    </span>
                </router-link>
            </div>
        </template>
    </header-navigation>
</template>

<script setup lang="ts">
import HeaderNavigation from "@/components/structure/header-navigation.vue";
import {ref} from "vue";

const items = ref([
    {
        title: 'Devenir prestataire',
        value: 'devenir-prestataire',
        to: 'become-contractor',
    },
    {
        title: 'Connexion',
        value: 'connexion',
        to: 'login',
    },
    {
        title: 'Inscription',
        value: 'inscription',
        to: 'register',
    },
])
</script>