<template>
    <div v-if="false" class="tw-flex tw-flex-col tw-items-center tw-justify-center tw-h-full sm:tw-p-5">
        <img src="/undraw_chatting_re_j55r.svg" alt="" class="tw-h-64">
        <div class="tw-flex tw-flex-col tw-text-center">
            <p class="tw-font-bold tw-text-xl">Aucune conversation en cours</p>
            <p>Lorsque vous réservez un prestataire pour vos demandes, les messages s’afficheront ici.</p>
        </div>
    </div>
    <div v-else>
        <router-link
            v-for="chat in chats"
            class="tw-border-b tw-h-24 tw-flex tw-items-center tw-p-5"
            :to="{name: 'client-chat', params: {id: chat._id}}"
        >
            <v-avatar color="surface-variant" size="60"/>
            <div class="tw-px-4 tw-h-full tw-w-5/6">
                <div class="tw-flex">
                    <p>
                        <span v-for="member in chat.members">
                            {{ member }}
                        </span>
                    </p>
                    <v-spacer />
                    <div class="tw-text-sm tw-self-end tw-text-neutral-500">
                        10:10
                    </div>
                </div>
                <div class="tw-text-sm tw-text-neutral-600 tw-truncate">
                    ezaeazezaeazezaeazezaeazezaeazezaeazezaeazezaeazezaeazezaeazezaeaz
                </div>
            </div>
        </router-link>
    </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
const props = defineProps({
    chats: {
        type: Array,
        required: true,
    },
});
</script>

<style scoped>

</style>