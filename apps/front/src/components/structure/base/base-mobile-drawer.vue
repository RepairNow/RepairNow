<template>
    <mobile-drawer
        :items="items"
    >
        <template #drawer-content>
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
                    {{ item.title }}
                </v-btn>
            </router-link>
        </template>
    </mobile-drawer>
</template>

<script setup lang="ts">
import MobileDrawer from "@/components/structure/mobile-drawer.vue";
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