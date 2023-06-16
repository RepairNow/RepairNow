<template>
    <div class="tw-flex tw-h-screen tw-w-screen tw-py-16 sm:tw-pb-0">
        <mobile-navigation />
        <mobile-drawer />
        <header-navigation />
        <div class="tw-bg-green-100 tw-h-full tw-w-full">
            aez
        </div>
        <div class="tw-bg-green-100 tw-h-full tw-w-full">
            eza
        </div>
    </div>
</template>

<script setup>
import MobileDrawer from "@/components/structure/base/mobile-drawer.vue";
import MobileNavigation from "@/components/structure/base/mobile-navigation.vue";
import HeaderNavigation from "@/components/structure/client/header-navigation.vue";
</script>

<style scoped>

</style>