<template>
    <div class="tw-flex tw-flex-col md:tw-flex-row tw-p-10">
        <div class="tw-w-full">
            <div class="tw-w-full tw-bg-primary tw-h-32 md:tw-h-64">
                Image
            </div>
            <div class="tw-flex tw-flex-col xl:tw-flex-row">
                <div class="tw-w-full">
                    <div class="tw-flex tw-items-center tw-w-full">
                        <div class="tw-flex tw-grow-1 tw-w-full tw-text-xl tw-font-bold xl:tw-text-2xl">
                            <div>
                                {{announcement.title}}
                            </div>
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

                    <div class="tw-flex tw-w-full tw-my-4">
                        <span class="tw-p-2 tw-w-full tw-text-center tw-rounded-md tw-text-white tw-font-bold">
                            <announcement-estimate-form
                                v-if="!filteredArray?.length"
                                :announcement="announcement"
                            />
                            <div v-else class="tw-text-black">
                                Votre offre
                                <div v-for="array in filteredArray">
                                    {{ array.id }} {{array.currentStatus}}
                                </div>

                                Mettre à jour si status est pas accepter
                            </div>
                        </span>
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
import AnnouncementEstimateForm from "@/components/modal/form/announcements/announcement-estimate-form.vue";
import {useUserStore} from "@/stores/user";

const announcementsStore = useAnnouncementStore()
const {announcement} = storeToRefs(announcementsStore)
const {getAnnouncement} = announcementsStore
const {currentUser} = storeToRefs(useUserStore())

const route = useRoute()

const startTime = new Date(announcement.value.startTime).toLocaleDateString('fr-FR', { day: "2-digit", month: "long", hour: "2-digit", minute: "2-digit" })
const endTime = new Date(announcement.value.endTime).toLocaleDateString('fr-FR', { day: "2-digit", month: "long", hour: "2-digit", minute: "2-digit" })

const filteredArray = ref()
onMounted(async () => {
    await getAnnouncement(route.params.id.toString())
    const estimates = announcement.value.estimates
    filteredArray.value = estimates.filter(estimate => estimate.prestataire.sub === currentUser. bien || estimate.currentStatus === 'WAITING_PAYMENT');
    console.log(filteredArray.value)
})
</script>

<style scoped>

</style>