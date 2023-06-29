<template>
    <sidebar-navigation
        :items="[
            {
                title: 'Devenir prestataire',
                value: 'devenir-prestataire',
                to: 'home-page',
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
import SidebarNavigation from "@/components/structure/sidebar-navigation.vue";
</script>

<style scoped>

</style>