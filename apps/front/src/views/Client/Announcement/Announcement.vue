<template>
    <div class="tw-flex tw-flex-col md:tw-flex-row tw-p-10">
        <div class="tw-w-full">
            <div class="tw-w-full tw-bg-primary tw-h-32 md:tw-h-64">
                Image
            </div>
            <div class="tw-flex tw-flex-col xl:tw-flex-row">
                <div class="xl:tw-w-8/12">
                    <div class="tw-flex tw-items-center tw-w-full">
                        <div class="tw-grow-1 tw-w-full tw-text-xl tw-font-bold xl:tw-text-2xl">
                            {{announcement.title}}
                        </div>
                        <div class="tw-py-4">
                            <span class="tw-p-4 tw-border tw-rounded-full tw-bg-primary tw-text-white tw-font-bold">{{announcement.currentStatus}}</span>
                        </div>
                    </div>
                    <div class="tw-flex">
                        <div>
                            Début : {{ startTime }}
                        </div>
                        <v-spacer />
                        <div>
                            Fin : {{ endTime }}
                        </div>
                    </div>
                    <div class="tw-py-4">
                        <p>
                            {{announcement.address}}
                        </p>
                    </div>
                    <div class="tw-py-4">
                        <p>
                            {{announcement.description}}
                        </p>
                    </div>
                </div>
                <div class="tw-font-bold xl:tw-w-4/12">
                    <div class="tw-flex tw-items-center tw-w-full xl:tw-p-4">
                        <div class="tw-grow-1 tw-w-full tw-text-xl tw-font-bold xl:tw-text-2xl">
                            Offres
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

import {useAnnouncementStore} from "@/stores/announcement";
import {storeToRefs} from "pinia";
import {onMounted} from "vue";
import {useRoute} from "vue-router";

const announcementsStore = useAnnouncementStore()
const {announcement} = storeToRefs(announcementsStore)
const {getAnnouncement} = announcementsStore

const route = useRoute()

const startTime = new Date(announcement.value.startTime).toLocaleDateString('fr-FR', { day: "2-digit", month: "long", hour: "2-digit", minute: "2-digit" })
const endTime = new Date(announcement.value.endTime).toLocaleDateString('fr-FR', { day: "2-digit", month: "long", hour: "2-digit", minute: "2-digit" })

onMounted(async () => {
    await getAnnouncement(route.params.id.toString())
})
</script>

<style scoped>

</style>