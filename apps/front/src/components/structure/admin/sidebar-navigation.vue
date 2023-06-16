<template>
    <sidebar-navigation
        :items="[
            {
                title: 'Mes demandes',
                value: 'mes-demandes',
                icon: 'mdi-bookmark-outline',
                to: '',
            },
            {
                title: 'Notifications',
                value: 'notifications',
                icon: 'mdi-bell-outline',
                to: '',
            },
            {
                title: 'Messagerie',
                value: 'messagerie',
                icon: 'mdi-message-outline',
                to: '',
            },
            {
                title: 'Compte',
                value: 'compte',
                icon: 'mdi-account-outline',
                to: '',
            },
        ]"
    />
</template>

<script setup>
import SidebarNavigation from "@/components/structure/sidebar-navigation.vue";
</script>

<style scoped>

</style>