<template>
    <div v-if="announcement" class="tw-flex tw-flex-col tw-relative">
        <div
            class="tw-absolute tw-bg-white tw-w-full tw-h-full tw-z-[1] tw-justify-center"
            :class="checkEstimate ? 'tw-flex' : 'tw-hidden'"
        >
            <div class="tw-flex tw-flex-col tw-items-center tw-mt-64">
                <div class="tw-flex tw-flex-col tw-items-center">
                    <v-icon
                            size="120"
                            :color="estimateStatus.color"
                    >
                        {{ estimateStatus.icon }}
                    </v-icon>
                    {{ estimateStatus.text }}
                </div>
                <div class="hover:tw-text-primary/80 tw-text-primary tw-underline tw-cursor-pointer" @click="checkEstimate = false">
                    Revenir sur l'annonce
                </div>
            </div>
        </div>
        <div class="tw-w-full tw-bg-primary tw-h-32 md:tw-h-64">
            <v-img v-if="announcement.images" :src="getImage(announcement.images[0]?.id)" />
            <div v-else></div>
        </div>
        <div class="tw-w-full tw-p-10">
            <div class="tw-flex tw-flex-col xl:tw-flex-row">
                <div class="xl:tw-w-7/12 tw-flex tw-flex-col tw-gap-4">
                    <div class="tw-flex tw-items-center tw-w-full">
                        <div class="tw-grow-1 tw-w-full tw-text-xl tw-font-bold xl:tw-text-4xl tw-flex tw-items-center">
                            {{ announcement.title }} <span class="tw-text-white tw-text-2xl tw-bg-primary tw-py-1 tw-px-2 tw-mx-4 tw-rounded-md">{{ announcement.currentStatus }}</span>
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
                        <div v-for="image in announcement.images"
                            class="tw-w-64 tw-h-64 tw-bg-primary tw-text-white tw-p-3"
                        >
                            <v-img :src="getImage(image.id)" />
                        </div>
                    </div>
                </div>
                <div class="xl:tw-w-5/12 tw-border-l-2">
                    <div v-if="!filteredArray?.length"
                         class="tw-flex tw-flex-col tw-w-full xl:tw-p-4"
                    >
                        <div class="tw-grow-1 tw-w-full tw-text-xl tw-font-bold xl:tw-text-2xl">
                            Offres
                        </div>
                        <div v-if="announcement.estimates?.length">
                            <div v-for="estimate in announcement.estimates"
                                class="tw-border tw-my-2 tw-rounded-lg tw-p-4"
                            >
                                <div class="tw-flex tw-items-center">
                                    <div>
                                        <v-avatar color="surface-variant" size="45" class="tw-mr-3"/>
                                    </div>
                                    <div>
                                        {{estimate.prestataire.firstname}}
                                        {{estimate.prestataire.lastname}}
                                    </div>
                                </div>
                                <div>
                                    {{estimate.price}} €
                                </div>

                                <div>
                                    {{estimate.description}}
                                </div>
                                <div>
                                    <estimation-confirmation
                                        :estimate="estimate"
                                    />
                                </div>
                            </div>
                        </div>
                        <div v-else>
                            Aucune offres disponible
                        </div>
                    </div>
                    <div
                        v-else
                    >
                        <div>
                            <div v-for="estimate in filteredArray"
                                 class="tw-my-2 tw-rounded-lg tw-px-4"
                            >
                                <div class="tw-w-full tw-text-xl tw-font-bold xl:tw-text-2xl tw-mb-4">Devis</div>

                                <div class="tw-flex tw-items-center">
                                    <div>
                                        <v-avatar color="surface-variant" size="45" class="tw-mr-3"/>
                                    </div>
                                    <div>
                                        {{estimate.prestataire.firstname}}
                                        {{estimate.prestataire.lastname}}
                                    </div>
                                    <v-spacer />
                                    <div class="tw-flex">
                                        <div v-if="estimate.currentStatus === 'ACCEPTED'" class="tw-p-2 tw-text-white tw-border-0 tw-rounded-lg tw-bg-primary ">
                                            Accepté
                                        </div>
                                        <div v-if="estimate.currentStatus === 'WAITING_PAYMENT'">
                                            <div>
                                                {{estimate.currentStatus}}
                                            </div>
                                            <div>
                                                Pay
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="tw-my-8">
                                    <p><span class="tw-underline">Tarif :</span> {{estimate.price}} €</p>
                                    <p>
                                        <span class="tw-underline">Description :</span> {{estimate.description}}
                                    </p>
                                </div>
                                <div>
                                    <mission-validation-modal
                                        :mission="announcement.mission"
                                    />
                                </div>
                                <!--<div class="tw-h-10 tw-bg-white tw-relative tw-border-2 tw-border-primary tw-rounded-lg tw-cursor-pointer"
                                     @click="showValidationCode = !showValidationCode"
                                >
                                    <div v-if="!showValidationCode"
                                         class="tw-absolute tw-w-full tw-h-full tw-flex tw-items-center tw-bg-primary hover:tw-bg-primary"
                                    >
                                        <p class="tw-text-center tw-text-white tw-font-semibold tw-w-full">Montrer le code de validation</p>
                                    </div>
                                    <div class="tw-font-bold tw-w-full tw-h-full tw-flex tw-items-center tw-text-center tw-jutify-center">
                                        <p class="tw-text-center tw-font-semibold tw-w-full">0 - 1 - 3 - 4</p>
                                    </div>
                                </div>
                                <div v-if="estimate.currentStatus === 'WAITING_PAYMENT'">
                                    <v-btn>
                                        Annuler
                                    </v-btn>
                                </div>-->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <router-link :to="{name: 'client-geo-location', params: { id: announcement.id }}">
                <v-btn>Voir Position du prestataire</v-btn>
            </router-link>
        </div>
    </div>
</template>

<script setup lang="ts">
import {useAnnouncementStore} from "@/stores/announcement";
import {storeToRefs} from "pinia";
import {onMounted, ref} from "vue";
import {useRoute} from "vue-router";
import EstimationConfirmation from "@/components/modal/confirm/estimation-confirmation.vue";
import {useEstimateStore} from "@/stores/estimate";
import MissionValidationModal from "@/components/modal/form/missions/mission-validation-modal.vue";
import imageService from "@/services/api/image";

const { getImage } = imageService;
const announcementsStore = useAnnouncementStore()
const {announcement} = storeToRefs(announcementsStore)
const {getAnnouncement} = announcementsStore

const estimateStore = useEstimateStore()
const {checkAnnouncementEstimateStatus} = estimateStore
const {estimate} = storeToRefs(estimateStore)

const route = useRoute()

const dialog = ref(false)
const startTime = ref('')
const endTime = ref('')
const filteredArray = ref()
const checkEstimate = ref(false)
const estimateStatus = ref({
    icon: '',
    text: '',
    color: ''
})
const showValidationCode = ref(false)
onMounted(async () => {
    if (route.query?.estimate_id) {
        await checkAnnouncementEstimateStatus({announcementId: route.params.id.toString(), estimateId: route.query?.estimate_id.toString()});
        checkEstimate.value = true
        switch (estimate.value.currentStatus) {
            case 'ACCEPTED':
                estimateStatus.value = {
                    icon: 'mdi-check-circle',
                    text: 'Le paiement à été accepter.',
                    color: 'success'
                }
                break;
            case 'WAITING_PAYMENT':
            case 'PENDING':
                estimateStatus.value = {
                    icon: 'mdi-clock',
                    text: 'Le paiement est en attente.',
                    color: 'warning'
                }
                break;
            case 'REFUSED':
                estimateStatus.value = {
                    icon: 'mdi-close-circle',
                    text: 'Le paiement à été refuser.',
                    color: 'error'
                }
                break;
        }

    }

    await getAnnouncement(route.params.id.toString())    
    const estimates = announcement.value.estimates
    filteredArray.value = estimates.filter(estimate => estimate.currentStatus === 'ACCEPTED' || estimate.currentStatus === 'WAITING_PAYMENT');
    startTime.value = new Date(announcement.value.startTime).toLocaleString('fr-FR', { day: "2-digit", month: "long", hour: "2-digit", minute: "2-digit" })
    endTime.value = new Date(announcement.value.endTime).toLocaleString('fr-FR', { day: "2-digit", month: "long", hour: "2-digit", minute: "2-digit" })
})
</script>

<style scoped>

</style>
