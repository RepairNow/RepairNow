<template>
    <mobile-navigation
        :items="[
            {
                title: 'Mes demandes',
                value: 'mes-demandes',
                icon: 'mdi-bookmark-outline',
                to: 'client-announcements',
            },
            {
                title: 'Notifications',
                value: 'notifications',
                icon: 'mdi-bell-outline',
                to: 'client-notifications',
            },
            {
                title: 'Messagerie',
                value: 'messagerie',
                icon: 'mdi-message-outline',
                to: 'client-chats',
            },
            {
                title: 'Compte',
                value: 'compte',
                icon: 'mdi-account-outline',
                to: 'client-profile',
            },
        ]"
    />
</template>

<script setup lang="ts">
import MobileNavigation from "@/components/structure/mobile-navigation.vue";

</script>