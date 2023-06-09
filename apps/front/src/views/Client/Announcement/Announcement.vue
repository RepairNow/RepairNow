<template>
    <div v-if="announcement" class="tw-flex tw-flex-col tw-relative tw-h-full">
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
        <div class="tw-w-full sm:tw-p-10 tw-p-2">
            <div class="tw-flex tw-flex-col xl:tw-flex-row">
                <div class="xl:tw-w-7/12 tw-flex tw-flex-col tw-gap-4">
                    <div class="tw-flex tw-items-center tw-w-full">
                        <div class="tw-flex-wrap tw-gap-y-2 tw-w-full tw-text-xl tw-font-bold xl:tw-text-4xl tw-flex tw-items-center">
                            {{ announcement.title }} <span class="tw-text-white tw-text-sm tw-bg-primary tw-py-1 tw-px-2 tw-mx-4 tw-rounded-md">{{ announcement.currentStatus }}</span>
                            <v-btn :to="{name: 'client-geo-location', params: { id: announcement.id }}">
                                <v-btn>Voir Position du prestataire</v-btn>
                            </v-btn>
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
                    <div class="tw-flex tw-justify-center sm:tw-justify-left tw-gap-4 tw-flex-wrap tw-rounded-lg tw-pt-4 tw-mx-2">
                        <div v-for="image in announcement.images"
                            class="tw-text-white tw-p-3"
                        >
                            <v-img :src="getImage(image.id)" />
                        </div>
                    </div>
                </div>
                <div class="xl:tw-w-5/12 tw-pt-4 xl:tw-pt-0 xl:tw-border-l-2">
                    <div v-if="!filteredArray?.length"
                         class="tw-flex tw-flex-col tw-w-full xl:tw-p-4"
                    >
                        <div class="tw-grow-1 tw-w-full tw-text-xl tw-font-bold xl:tw-text-2xl">
                            Offres
                        </div>
                        <div v-if="announcement.estimates?.length">
                            <div v-for="estimate in announcement.estimates"
                                class="tw-bg-white tw-shadow-md tw-rounded-lg tw-my-2 tw-p-4"
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
                                <div class="py-3">
                                    <div>
                                        <span class="tw-font-bold">Prix: </span>{{estimate.price}} €
                                    </div>
                                    <div>
                                        <span class="tw-font-bold">Description: </span>{{estimate.description}}
                                    </div>
                                </div>
                                <div class="tw-flex tw-gap-4">
                                    <estimation-confirmation
                                        :estimate="estimate"
                                    />
                                    <v-btn class="lg:tw-mr-16" @click="handleDiscuss(estimate.prestataireId)">Discuter</v-btn>
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
                                                Paye
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="tw-my-8">
                                    <p><span class="tw-font-bold">Tarif :</span> {{estimate.price}} €</p>
                                    <p>
                                        <span class="tw-font-bold">Description :</span> {{estimate.description}}
                                    </p>
                                </div>
                                <div>
                                    <mission-validation-modal
                                        v-if="announcement.currentStatus !== 'DONE'"
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
        </div>
    </div>
</template>

<script setup lang="ts">
import {useAnnouncementStore} from "@/stores/announcement";
import {storeToRefs} from "pinia";
import {onMounted, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import EstimationConfirmation from "@/components/modal/confirm/estimation-confirmation.vue";
import {useEstimateStore} from "@/stores/estimate";
import MissionValidationModal from "@/components/modal/form/missions/mission-validation-modal.vue";
import imageService from "@/services/api/image";
import chatService from "@/services/api/chat";

const { getImage } = imageService;
const announcementsStore = useAnnouncementStore()
const {announcement} = storeToRefs(announcementsStore)
const {getAnnouncement} = announcementsStore

const estimateStore = useEstimateStore()
const {checkAnnouncementEstimateStatus} = estimateStore
const {estimate} = storeToRefs(estimateStore)

const route = useRoute()
const router = useRouter()

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
const { _createChat } = chatService;

const showValidationCode = ref(false)
onMounted(async () => {
    if (route.query?.estimate_id) {
        await checkAnnouncementEstimateStatus({announcementId: route.params.id.toString(), estimateId: route.query?.estimate_id.toString()});
        checkEstimate.value = true
        switch (estimate.value.currentStatus) {
            case 'ACCEPTED':
                estimateStatus.value = {
                    icon: 'mdi-check-circle',
                    text: 'Le paiement à été accepté',
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
                    text: 'Le paiement à été refusé',
                    color: 'error'
                }
                break;
        }

    }

    await getAnnouncement(route.params.id.toString())    
    const estimates = announcement.value.estimates
    filteredArray.value = estimates.filter(estimate => estimate.currentStatus === 'ACCEPTED' || estimate.currentStatus === 'WAITING_PAYMENT');
    startTime.value = new Date(announcement.value.startTime).toLocaleString('fr-FR', { day: "2-digit", month: "long", hour: "2-digit", minute: "2-digit" })
    //endTime.value = new Date(announcement.value.endTime).toLocaleString('fr-FR', { day: "2-digit", month: "long", hour: "2-digit", minute: "2-digit" })
})

const handleDiscuss = async (prestataireId: string) => {
    const conversation = await _createChat({
        members: [{userId: announcement.value.user.id, userFirstname: prestataireId}],
        announcementId: announcement.value.id
    })

    await router.push({name: 'client-chat', params: {id: conversation._id}})
}
</script>

<style scoped>

</style>
