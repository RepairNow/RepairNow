<template>
    <div class="tw-flex tw-flex-col tw-gap-5 tw-m-5 xl:tw-mx-64">
        <div class="tw-font-bold tw-text-2xl lg:tw-text-4xl">
            Mes notifications
        </div>
        <div class="tw-flex tw-flex-col tw-gap-4 tw-my-4">
            <notification
                    v-for="notification in notifications"
                    :notification="notification"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import Notification from "@/components/notification/notification.vue";
import {ref} from "vue";

const notifications = ref<Notification[]>([
    {
        title: 'notification title',
        content: 'notification content',
        created_at: '12/02/10',
    },
])
</script>

<style scoped>

</style>