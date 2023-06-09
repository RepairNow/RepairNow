<template>
    <div v-if="announcement" class="tw-flex tw-bg-white tw-flex-col tw-p-8 tw-rounded-xl tw-gap-4 tw-shadow-lg">
        <div class="tw-flex tw-flex-col lg:tw-flex-row tw-gap-4 tw-w-full">
            <div class="tw-flex tw-flex-col tw-w-full lg:tw-w-1/2">
                <div class="tw-h-56 tw-rounded-xl">
                    <v-img v-if="announcement.images.length > 0" :src="getImage(announcement.images[0].id)" />
                    <v-img v-else :src="useJobImages(announcement?.job?.title)" />
                </div>
                <div class="tw-my-4">
                    <p class="tw-text-xl tw-font-bold">{{announcement.title}}</p>
                    <p class="tw-truncate">{{ announcement.description }}</p>
                </div>
            </div>
            <div v-if="!contractorView" class=" tw-w-full lg:tw-w-1/2">
                <div class="tw-border-y tw-p-6" v-if="filteredArray?.length" v-for="array in filteredArray">
                    <div>
                        Vous avez réservé un prestataire
                    </div>
                    <div>
                        {{ array.prestataire.firstname }} {{ array.prestataire.lastname }}
                    </div>
                </div>
                <div v-else class="tw-border-y tw-p-6">
                    Vous n'avez pas réservé de prestataire
                </div>
                <div class="tw-my-3 tw-p-3 tw-border tw-border-primary tw-rounded-xl">
                    Vous avez reçu <span class="tw-font-bold">{{ announcement.estimates?.length ?? 0 }}</span> offre(s)
                </div>
                <div v-if="announcement.currentStatus === 'DONE' && announcement.mission.review[0]?.id" class="tw-flex tw-flex-col tw-my-3 tw-p-3 tw-border tw-border-primary tw-rounded-xl">
                    Votre avis
                    <v-rating v-model="announcement.mission.review[0].rating" disabled=""/>
                    <p>{{announcement.mission.review[0].description}}</p>
                </div>
            </div>
            <div v-else-if="filteredArray?.length" class=" tw-w-full lg:tw-w-1/2">
                <p class="tw-p-3 tw-border tw-rounded-lg">Vous avez soumis un devis de {{ filteredArray[0].price}} €</p>
            </div>
            <div v-else class=" tw-w-full lg:tw-w-1/2">
                <p class="tw-p-3 tw-border tw-rounded-lg">Vous n'avez soumis aucun devis</p>
            </div>
        </div>
        <div class="tw-flex tw-gap-4 tw-flex-wrap">
            <div class="tw-p-2 tw-bg-primary/20 tw-rounded-lg tw-text-black tw-flex tw-gap-2">
                <v-icon icon="mdi-calendar-outline" /><span>{{ startTime }}</span>
            </div>
            <div class="tw-p-2 tw-bg-primary/20 tw-rounded-lg tw-text-black tw-flex tw-gap-2">
                <v-icon icon="mdi-clock-outline" /><span>{{announcement.estimatedTime}} heures</span>
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
        <div v-if="!contractorView">
            <div
                v-if="announcement.currentStatus === 'DONE'"
                class="tw-flex tw-gap-4">
                <router-link :to="{name: 'client-announcement', params: { id: announcement.id }}" class="tw-w-full">
                    <v-btn
                            block
                    >
                        Voir ma demande
                    </v-btn>
                </router-link>
                <review-form
                    :announcement="announcement"
                />
            </div>
            <div v-else>
                <router-link :to="{name: 'client-announcement', params: { id: announcement.id }}" class="tw-w-full">
                    <v-btn
                            block
                    >
                        Gérer ma demande
                    </v-btn>
                </router-link>
            </div>
        </div>
        <div v-else>
            <router-link :to="{name: 'contractor-announcement', params: { id: announcement.id }}">
                <v-btn
                        block
                >
                    En savoir plus
                </v-btn>
            </router-link>
        </div>
    </div>
</template>

<script setup lang="ts">
import {onMounted, PropType, ref} from "vue";
import {AnnouncementI} from "@/interfaces/announcement";
import ReviewForm from "@/components/modal/form/review/review-form.vue";
import imageService from "@/services/api/image";
import {useJobImages} from "@/composables/jobImages"
import {useUserStore} from "@/stores/user";
const { getImage } = imageService;
const userStore = useUserStore()
const {currentUser} = userStore
const props = defineProps({
    announcement: {
        type: Object as PropType<AnnouncementI>,
        required: true
    },
    contractorView: {
        type: Boolean,
        default: false
    }
})

const filteredArray = ref()
const startTime = ref()
onMounted(async () => {
    
    const estimates = props.announcement.estimates
    if(!props.contractorView) {
        filteredArray.value = estimates.filter(estimate => estimate.currentStatus === 'ACCEPTED');
    } else {
        filteredArray.value = estimates.filter(estimate => estimate.prestataire.id === currentUser?.sub);
    }
    startTime.value = new Date(props.announcement.startTime).toLocaleString('fr-FR', { day: "2-digit", month: "long", hour: "2-digit", minute: "2-digit" })
})
/**
 * Prestarire reservé
 * Offre prestataire
 * Titre du services
 * Date de demande (+ durée)
 * Gérer ma demande
 */
</script>

