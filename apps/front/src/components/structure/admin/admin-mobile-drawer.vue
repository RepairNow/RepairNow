<template>
    <mobile-drawer
        :items="[
            {
                title: 'Mes demandes',
                value: 'mes-demandes',
                icon: 'mdi-bookmark-outline',
                to: 'admin-announcements',
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
import MobileDrawer from "@/components/structure/mobile-drawer.vue";

</script>