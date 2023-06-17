<template>
    <mobile-navigation
        :items="[
            {
                title: 'Mes demandes',
                value: 'mes-demandes',
                icon: 'mdi-bookmark-outline',
                to: 'contractor-announcements',
            },
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
import MobileNavigation from "@/components/structure/mobile-navigation.vue";

</script>