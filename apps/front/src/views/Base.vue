<template>
    <div class="tw-flex tw-h-screen tw-w-screen tw-pt-16">
        <mobile-drawer />
        <header-navigation />
        <div class="tw-h-full tw-w-full overflow-auto">
            <router-view />
        </div>
    </div>
</template>

<script setup lang="ts">
import MobileDrawer from "@/components/structure/base/base-mobile-drawer.vue";
import HeaderNavigation from "@/components/structure/base/base-header-navigation.vue";
</script>

<style scoped>

</style>