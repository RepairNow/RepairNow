<template>
    <div v-if="!isSizeLG" class="tw-flex tw-h-screen tw-w-screen tw-py-16 sm:tw-pb-0">
        <header-navigation/>
        <div class="tw-h-full tw-w-80 tw-hidden sm:tw-flex">
            <sidebar-navigation/>
        </div>
        <div class="tw-bg-[#F2F2F2] tw-h-full tw-w-full">
            <router-view />
        </div>
    </div>
    <div
        v-else
        class="tw-flex tw-flex-col tw-items-center tw-justify-center tw-h-screen tw-gap-10"
    >
        <img src="/undraw_no_data_re_kwbl.svg" alt="" class="tw-w-1/3"/>
        <p class="tw-text-xl tw-px-10 tw-text-center tw-font-bold">
            L'interface Admin n'est pas disponible sur cet appareil.
        </p>
        <router-link :to="{name: 'home'}" class="tw-text-primary tw-underline">
            Retour à la page d'accueil
        </router-link>
    </div>
</template>

<script setup lang="ts">
import MobileDrawer from "@/components/structure/admin/admin-mobile-drawer.vue";
import MobileNavigation from "@/components/structure/admin/admin-mobile-navigation.vue";
import HeaderNavigation from "@/components/structure/admin/admin-header-navigation.vue";
import SidebarNavigation from "@/components/structure/admin/admin-sidebar-navigation.vue";
import { useScreenSize } from "@/stores/screen-size";
import {storeToRefs} from "pinia";

const screenSize = useScreenSize()
const { isSizeLG } = storeToRefs(screenSize)
</script>

<style scoped>

</style>
