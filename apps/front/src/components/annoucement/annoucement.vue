<template>
    <div class="tw-flex tw-flex-col tw-p-8 tw-rounded-xl">
        <div class="tw-flex tw-flex-col lg:tw-flex-row tw-gap-4 tw-w-full">
            <div class="tw-flex tw-flex-col tw-w-1/2">
                <div class="tw-h-56 tw-bg-red-100 tw-rounded-xl">
                    image
                </div>
                <div class="tw-my-4">
                    <p class="tw-text-xl tw-font-bold">{{announcement.title}}</p>
                    <p class="">{{announcement.job.title}}</p>
                    <p>{{new Date(announcement.startTime).toLocaleString() }}</p>
                    <p>{{new Date(announcement.endTime).toLocaleString() }}</p>
                    <p class="tw-truncate">{{ announcement.description }}</p>
                </div>
            </div>
            <div class="tw-w-1/2">
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
                <div class="tw-my-3 tw-p-3 tw-border tw-rounded-xl">
                    Vous avez reçu {{ announcement.estimates?.length ?? 0 }} offre(s)
                </div>
            </div>
        </div>
        <div v-if="!contractorView">
            <router-link :to="{name: 'client-announcement', params: { id: announcement.id }}">
                <v-btn
                    block
                >
                    Gérer ma demande
                </v-btn>
            </router-link>
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
onMounted(async () => {
    const estimates = props.announcement.estimates
    filteredArray.value = estimates.filter(estimate => estimate.currentStatus === 'ACCEPTED');
})
/**
 * Prestarire reservé
 * Offre prestataire
 * Titre du services
 * Date de demande (+ durée)
 * Gérer ma demande
 */
</script>

