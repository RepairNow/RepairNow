<template>
    <sidebar-navigation
        :items="[
            {
                title: 'Les demandes',
                value: 'les-demandes',
                icon: 'mdi-bookmark-outline',
                to: 'contractor-announcements',
            },
            /*{
                title: 'Mes devis',
                value: 'mes-devis',
                icon: 'mdi-bookmark-outline',
                to: 'contractor-estimates',
            },
            {
                title: 'Mes missions',
                value: 'mes-missions',
                icon: 'mdi-bookmark-outline',
                to: 'contractor-missions',
            },*/
            {
                title: 'Notifications',
                value: 'notifications',
                icon: 'mdi-bell-outline',
                to: 'contractor-notifications',
            },
            {
                title: 'Messagerie',
                value: 'messagerie',
                icon: 'mdi-message-outline',
                to: 'contractor-chat',
            },
            {
                title: 'Compte',
                value: 'compte',
                icon: 'mdi-account-outline',
                to: 'contractor-profile',
            },
        ]"
    />
</template>

<script setup lang="ts">
import SidebarNavigation from "@/components/structure/sidebar-navigation.vue";
</script>

<style scoped>

</style>