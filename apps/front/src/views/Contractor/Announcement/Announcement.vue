<template>
    <div class="tw-flex tw-flex-col">
        <div class="tw-w-full tw-bg-primary tw-h-32 md:tw-h-64">
            Image
        </div>
        <div class="tw-w-full tw-p-10">
            <div class="tw-flex tw-flex-col xl:tw-flex-row">
                <div class="xl:tw-w-full tw-flex tw-flex-col tw-gap-4">
                    <div class="tw-flex tw-items-center tw-w-full">
                        <div class="tw-grow-1 tw-w-full tw-text-xl tw-font-bold xl:tw-text-4xl tw-flex tw-items-center">
                            {{ announcement.title }} <span class="tw-text-white tw-text-lg lg:tw-text-2xl tw-bg-primary tw-py-1 tw-px-2 tw-mx-4 tw-rounded-md">{{ announcement.currentStatus }}</span>
                        </div>
                        <div class="tw-flex">
                            <span class="tw-p-2 tw-w-full tw-text-center tw-rounded-md tw-text-white tw-font-bold">
                                <announcement-estimate-form
                                        v-if="!filteredArray?.length"
                                />
                                <announcement-estimate-modal
                                        v-else-if="filteredArray[0].currentStatus !== 'ACCEPTED'"
                                        :announcement="announcement"
                                        :estimate="filteredArray[0]"
                                />
                                <mission-modal
                                        v-else
                                />
                            </span>
                        </div>
                    </div>
                    <div class="tw-flex tw-gap-4 tw-flex-wrap">
                        <div class="tw-p-2 tw-bg-primary tw-rounded-lg tw-text-white tw-flex tw-gap-2">
                            <v-icon icon="mdi-calendar-outline" /><span>{{ startTime }}</span>
                        </div>
                        <div class="tw-p-2 tw-bg-primary tw-rounded-lg tw-text-white tw-flex tw-gap-2">
                            <v-icon icon="mdi-clock-outline" /><span>4 heures</span>
                        </div>
                        <a
                                class="tw-p-2 tw-bg-primary tw-rounded-lg tw-text-white tw-flex tw-gap-2 hover:tw-bg-primary/90"
                                :href="`https://www.google.com/maps/search/${announcement.address}`"
                        >
                            <v-icon icon="mdi-map-outline"/><span>{{announcement.address}}</span><v-icon icon="mdi-link"/>
                        </a>
                        <div
                                class="tw-p-2 tw-bg-primary tw-rounded-lg tw-text-white tw-flex tw-gap-2"
                        >
                            <v-icon icon="mdi-tools"/><span>{{announcement?.job?.title}}</span>
                        </div>
                    </div>
                    <div class="">
                        <p>
                            {{announcement.description}}
                        </p>
                    </div>
                    <div class="tw-flex tw-gap-4 tw-flex-wrap">
                        <div v-for="i in 5"
                             class="tw-w-full sm:tw-w-64 tw-h-64 tw-bg-primary tw-text-white tw-p-3"
                        >
                            Image {{i}}
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
import {onMounted, ref} from "vue";
import {useRoute} from "vue-router";
import EstimationConfirmation from "@/components/modal/confirm/estimation-confirmation.vue";
import AnnouncementEstimateForm from "@/components/modal/form/announcements/announcement-estimate-form.vue";
import {useUserStore} from "@/stores/user";
import AnnouncementEstimateModal from "@/components/modal/form/announcements/announcement-estimate-modal.vue";
import MissionModal from "@/components/modal/form/missions/mission-modal.vue";

const announcementsStore = useAnnouncementStore()
const {announcement} = storeToRefs(announcementsStore)
const {getAnnouncement} = announcementsStore
const {currentUser} = storeToRefs(useUserStore())

const dialog = ref(false)
const route = useRoute()

const startTime = ref('')
const endTime = ref('')

const filteredArray = ref()
onMounted(async () => {
    await getAnnouncement(route.params.id.toString())
    const estimates = announcement.value.estimates
    filteredArray.value = estimates.filter(estimate => estimate.prestataire.sub === currentUser.value?.id || estimate.currentStatus === 'WAITING_PAYMENT');
    startTime.value = new Date(announcement.value.startTime).toLocaleString('fr-FR', { day: "2-digit", month: "long", hour: "2-digit", minute: "2-digit" })
})

</script>

<style scoped>

</style>