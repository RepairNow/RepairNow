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
    >
        <template #title>
            Admin
        </template>
    </sidebar-navigation>

</template>

<script setup lang="ts">
import SidebarNavigation from "@/components/structure/sidebar-navigation.vue";
</script>

<style scoped>

</style>