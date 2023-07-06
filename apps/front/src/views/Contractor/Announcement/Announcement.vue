<template>
    <div class="tw-flex tw-flex-col">
        <div class="tw-w-full tw-p-10">
            <div class="tw-flex tw-flex-col xl:tw-flex-row">
                <div class="xl:tw-w-full tw-flex tw-flex-col tw-gap-4">
                    <div class="tw-flex tw-items-center tw-w-full">
                        <div class="tw-grow-1 tw-w-full tw-text-xl tw-font-bold xl:tw-text-4xl tw-flex tw-items-center">
                            {{ announcement.title }} <span class="tw-text-white tw-text-sm tw-bg-primary tw-py-1 tw-px-2 tw-mx-4 tw-rounded-md">{{ announcement.currentStatus }}</span>
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
                        <div class="tw-p-2 tw-bg-primary/20 tw-rounded-lg tw-text-black tw-flex tw-gap-2">
                            <v-icon icon="mdi-calendar-outline" /><span>{{ startTime }}</span>
                        </div>
                        <div class="tw-p-2 tw-bg-primary/20 tw-rounded-lg tw-text-black tw-flex tw-gap-2">
                            <v-icon icon="mdi-clock-outline" /><span>4 heures</span>
                        </div>
                        <a
                                class="tw-p-2 tw-bg-primary/20 tw-rounded-lg tw-text-black tw-flex tw-gap-2 hover:tw-bg-primary/30"
                                :href="`https://www.google.com/maps/search/${announcement.address}`"
                        >
                            <v-icon icon="mdi-map-outline"/><span>{{announcement.address}}</span><v-icon icon="mdi-link"/>
                        </a>
                        <div
                                class="tw-p-2 tw-bg-primary/20 tw-rounded-lg tw-text-black tw-flex tw-gap-2"
                        >
                            <v-icon icon="mdi-tools"/><span>{{announcement?.job?.title}}</span>
                        </div>
                    </div>
                    <div class="md:tw-border-l-4 md:tw-border-primary md:tw-h-full">
                        <p class="tw-pl-4 tw-italic">
                           {{announcement.description}}
                        </p>
                    </div>
                    <div class="tw-flex tw-justify-center sm:tw-justify-start tw-gap-4 tw-flex-wrap tw-rounded-lg tw-pt-4 tw-mx-2">
                        <div v-for="image in announcement.images"
                            class="tw-w-1/2 tw-text-white tw-p-3"
                        >
                            <v-img :src="getImage(image.id)" />
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
import imageService from "@/services/api/image";

const { getImage } = imageService;
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
