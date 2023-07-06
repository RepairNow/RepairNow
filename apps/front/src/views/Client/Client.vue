<template>
    <div class="tw-flex tw-h-screen tw-w-screen tw-py-16 sm:tw-pb-0">
        <mobile-navigation />
        <mobile-drawer />
        <header-navigation />
        <div class="tw-h-full tw-w-80 tw-hidden lg:tw-flex">
            <sidebar-navigation />
        </div>
        <div class="tw-bg-[#F2F2F2] tw-h-full tw-w-full overflow-auto">
            <router-view />
        </div>
    </div>
</template>

<script setup lang="ts">
import MobileDrawer from "@/components/structure/client/client-mobile-drawer.vue";
import MobileNavigation from "@/components/structure/client/client-mobile-navigation.vue";
import HeaderNavigation from "@/components/structure/client/client-header-navigation.vue";
import SidebarNavigation from "@/components/structure/client/client-sidebar-navigation.vue";
</script>

<style scoped>

</style>
