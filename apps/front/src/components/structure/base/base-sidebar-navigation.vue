<template>
    <sidebar-navigation
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
import SidebarNavigation from "@/components/structure/sidebar-navigation.vue";
</script>

<style scoped>

</style>