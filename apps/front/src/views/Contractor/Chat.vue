<template>
    <div class="tw-h-full tw-flex">
        <div
                :class="isSizeSM && route.params.id ? 'tw-hidden' : ''"
                class="tw-w-full tw-border-r tw-h-full sm:tw-w-96 tw-overflow-auto"
        >
            <chat-list/>
        </div>
        <div
                :class="isSizeSM && !route.params.id ? 'tw-hidden' : ''"
                class="tw-h-full tw-w-full tw-p-0 sm:tw-p-0"
        >
            <chat />
        </div>
    </div>
</template>

<script setup lang="ts">
import ChatList from "@/components/chat/chat-list.vue";
import Chat from "@/components/chat/chat.vue";
import {useRoute} from "vue-router";
import {useScreenSize} from "@/stores/screen-size";
import {storeToRefs} from "pinia";

const route = useRoute()
const {isSizeSM} = storeToRefs(useScreenSize())
</script>

<style scoped>

</style>