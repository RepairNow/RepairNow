<template>
    <div className="tw-flex tw-h-screen tw-w-screen tw-py-16 sm:tw-pb-0">
        <mobile-navigation/>
        <mobile-drawer/>
        <header-navigation/>
        <div class="tw-bg-green-100 tw-h-full tw-w-80 tw-hidden sm:tw-flex">
            <sidebar-navigation/>
        </div>
        <div className="tw-bg-green-100 tw-h-full tw-w-full">
            <router-view />
        </div>
    </div>
</template>

<script setup>
import MobileDrawer from "@/components/structure/admin/mobile-drawer.vue";
import MobileNavigation from "@/components/structure/admin/mobile-navigation.vue";
import HeaderNavigation from "@/components/structure/admin/header-navigation.vue";
import SidebarNavigation from "@/components/structure/admin/sidebar-navigation.vue";
</script>

<style scoped>

</style>