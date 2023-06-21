<template>
    <div v-if="route.params.id" class="tw-h-full tw-flex tw-flex-col tw-relative tw-pb-16 tw-w-full">
        <div class="tw-p-4 tw-flex tw-items-center tw-border-b">
            <router-link :to="{name: 'client-chats'}" class="tw-p-3 tw-flex tw-items-center tw-justify-center hover:tw-bg-neutral-100">
                <v-icon icon="mdi-chevron-left" />
            </router-link>
            <v-avatar color="surface-variant" size="45" class="tw-ml-3"/>
            <p class="tw-px-4 tw-text-xl tw-font-bold">
                user {{ route.params.id }}
            </p>
        </div>
        <div class="tw-h-full tw-p-4 tw-pb-16 overflow-auto tw-flex tw-flex-col tw-gap-4">
            <div
                v-for="message in messages"
                class="tw-flex"
                :class="message.userId === '0' ? 'tw-justify-end' : '' "
            >
                <span
                    class="tw-width-auto tw-justify-end tw-rounded-t-lg tw-p-3 tw-bg-red-100"
                    :class="message.userId === '0' ? 'tw-justify-end tw-rounded-l-lg' : 'tw-justify-end tw-rounded-r-lg' "
                >
                    {{ message.message }}
                </span>
            </div>
        </div>
        <div class="tw-absolute tw-bottom-3 tw-w-full tw-px-4 tw-flex tw-gap-4 tw-items-center">
            <v-text-field class="tw-bg-neutral-100" variant="filled" hide-details/>
            <v-btn class="tw-h-full tw-h-10 tw-rounded" icon="mdi-send"></v-btn>
        </div>
    </div>
    <div v-else class="tw-w-full tw-h-full tw-flex tw-flex-col tw-items-center tw-justify-center">
        <v-icon
            icon="mdi-forum-outline"
            size="80"
        />
        <p class="tw-text-xl tw-font-bold">Consultez vos messages</p>
        <p>Sélectionnez une conversation pour commencer</p>
    </div>
</template>

<script setup lang="ts">

import {useRoute} from "vue-router";

const route = useRoute()

const messages = [
    {
        userId: '0',
        message: 'message 1'
    },
    {
        userId: '0',
        message: 'message 1'
    },
    {
        userId: '2',
        message: 'message 2'
    },
    {
        userId: '0',
        message: 'message 3'
    },
    {
        userId: '2',
        message: 'message 4'
    },
]
</script>

<style scoped>

</style>