<template>
    <header-navigation
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
                title: 'Partenariat',
                value: 'partenariat',
                icon: 'mdi-handshake-outline',
                to: 'admin-partnerships',
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
import HeaderNavigation from "@/components/structure/header-navigation.vue";

</script>