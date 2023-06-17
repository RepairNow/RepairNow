<template>
    <header-navigation
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
import HeaderNavigation from "@/components/structure/header-navigation.vue";

</script>