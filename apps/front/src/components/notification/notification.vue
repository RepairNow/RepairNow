<template>
    <div class="tw-w-full tw-p-6 tw-bg-white tw-rounded-xl tw-shadow-lg">
        <p class="tw-text-neutral-400 tw-text-xs">Il y a {{notification.created_at}}</p>
        <p class="tw-font-bold tw-text-lg">{{notification.title}}</p>
        <p class="">{{notification.content}}</p>
    </div>
</template>

<script setup lang="ts">
    import {PropType} from "vue";
    import {NotificationI} from "@/interfaces/notification";

    const props = defineProps({
        notification: { type: Object as PropType<NotificationI>, required: true}
    })
</script>

<style scoped>

</style>
