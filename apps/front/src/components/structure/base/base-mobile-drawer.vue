<template>
    <mobile-drawer
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

<script setup>
import MobileDrawer from "@/components/structure/mobile-drawer.vue";

</script>