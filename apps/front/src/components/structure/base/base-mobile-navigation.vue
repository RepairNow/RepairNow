<template>
    <mobile-navigation
        :items="[
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
        ]"
    />
</template>

<script setup lang="ts">
import MobileNavigation from "@/components/structure/mobile-navigation.vue";

</script>