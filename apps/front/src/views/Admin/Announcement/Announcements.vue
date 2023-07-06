<template>
    <div class="tw-m-5 tw-font-bold tw-text-2xl lg:tw-text-4xl">
        Les demandes
    </div>
    <div class="tw-flex-grow-1 tw-mb-10">
        <div class="tw-table-container">
            <table class="tw-min-w-full">
                <thead class="tw-bg-white tw-border-b">
                <tr>
                    <th
                            scope="col"
                            class="tw-text-sm tw-font-medium tw-text-gray-900 tw-px-6 tw-py-2 tw-text-left">
                        Titre
                    </th>
                    <th
                            scope="col"
                            class="tw-text-sm tw-font-medium tw-text-gray-900 tw-px-6 tw-py-2 tw-text-left">
                        Status
                    </th>
                    <th
                            scope="col"
                            class="tw-text-sm tw-font-medium tw-text-gray-900 tw-px-6 tw-py-2 tw-text-left">
                        Métier requis
                    </th>
                    <th
                            scope="col"
                            class="tw-text-sm tw-font-medium tw-text-gray-900 tw-px-6 tw-py-2 tw-text-left">
                        Date
                    </th>
                    <th
                            scope="col"
                            class="tw-text-sm tw-font-medium tw-text-gray-900 tw-px-6 tw-py-2 tw-text-left">
                        Durée
                    </th>
                    <th
                            scope="col"
                            class="tw-text-sm tw-font-medium tw-text-gray-900 tw-px-6 tw-py-2 tw-text-left">
                        Client
                    </th>
                </tr>
                </thead>
                <tbody>
                <tr
                        v-for="(announcement, index) of announcements"
                        :key="`${announcement.id}`"
                        class="hover:tw-bg-gray-200 tw-bg-gray-100 tw-border-b"
                >
                    <td
                            class="tw-text-sm tw-text-gray-900 tw-font-light tw-px-6 tw-py-2 tw-whitespace-nowrap">
                        {{ announcement.title }}
                    </td>
                    <td
                            class="tw-text-sm tw-text-gray-900 tw-font-medium tw-px-6 tw-py-2 tw-whitespace-nowrap">
                        {{ announcement.currentStatus }}
                    </td>
                    <td
                            class="tw-text-sm tw-text-gray-900 tw-font-light tw-px-6 tw-py-2 tw-whitespace-nowrap">
                        {{ announcement.job.title }}
                    </td>
                    <td class="text-sm text-gray-900 font-light px-6 py-2">
                        {{ announcement.startTime }}
                    </td>
                    <td class="text-sm text-gray-900 font-light px-6 py-2">
                        {{ announcement.estimatedTime }}
                    </td>
                    <td class="text-sm text-gray-900 font-light px-6 py-2">
                        {{ announcement.user.email }}
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup lang="ts">
import {useAnnouncementStore} from "@/stores/announcement";
import {storeToRefs} from "pinia";
import {onMounted} from "vue";

const announcementStore = useAnnouncementStore()
const {getAnnouncements} = announcementStore
const {announcements} = storeToRefs(announcementStore)

onMounted(async () => {
    await getAnnouncements()
})
</script>

<style scoped>

</style>