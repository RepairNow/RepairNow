<template>
    <sidebar-navigation
        :items="[
            {
                title: 'Demandes',
                value: 'demandes',
                icon: 'mdi-bookmark-outline',
                to: 'admin-announcements',
            },
            {
                title: 'Utilisateurs',
                value: 'utilisateurs',
                icon: 'mdi-account-outline',
                to: 'admin-users',
            },
            {
                title: 'Geolocalisation',
                value: 'geolocalisation',
                icon: 'mdi-map-outline',
                to: 'admin-geo-locations',
            },
            {
                title: 'Partenariat',
                value: 'partenariat',
                icon: 'mdi-handshake-outline',
                to: 'admin-partnerships',
            },
            {
                title: 'Avis',
                value: 'avis',
                icon: 'mdi-star-outline',
                to: 'admin-reviews',
            },
            {
                title: 'Notifications',
                value: 'notifications',
                icon: 'mdi-bell-outline',
                to: 'admin-notifications',
            },
            {
                title: 'Messagerie',
                value: 'messagerie',
                icon: 'mdi-message-outline',
                to: 'admin-chat',
            },
            {
                title: 'Compte',
                value: 'compte',
                icon: 'mdi-account-outline',
                to: 'admin-profile',
            },
        ]"
    />

</template>

<script setup lang="ts">
import SidebarNavigation from "@/components/structure/sidebar-navigation.vue";
</script>

<style scoped>

</style>