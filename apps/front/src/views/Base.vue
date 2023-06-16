<template>
    <div class="tw-flex tw-h-screen tw-w-screen tw-pt-16">
        <mobile-drawer />
        <header-navigation />
        <div class="tw-bg-green-100 tw-h-full tw-w-full overflow-auto">
            <router-view />
        </div>
    </div>
</template>

<script setup>
import MobileDrawer from "@/components/structure/base/mobile-drawer.vue";
import MobileNavigation from "@/components/structure/base/mobile-navigation.vue";
import HeaderNavigation from "@/components/structure/base/header-navigation.vue";
import SidebarNavigation from "@/components/structure/base/sidebar-navigation.vue";
</script>

<style scoped>

</style>