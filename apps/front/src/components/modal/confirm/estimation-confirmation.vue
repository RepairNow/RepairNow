<template>
    <v-dialog
            v-model="dialog"
            transition="dialog-bottom-transition"
    >
        <template v-slot:activator="{ props }">
            <div v-bind="props">
                <slot name="button">
                    <v-btn color="primary">Selectionner cet offre</v-btn>
                </slot>
            </div>
        </template>

        <v-card class="tw-w-2/3 tw-mx-auto tw-p-4 rounded-lg">
            <div class="tw-flex">
                <v-btn icon="mdi-close" color="none" @click="dialog = false" />
            </div>
            <div class="mb-4">
                <p
                        class="tw-text-3xl tw-font-bold tw-flex tw-items-center tw-h-16">
                    Êtes-vous sûr de vouloir selectionnez cet offre ?
                </p>
            </div>
            <div class="grid-container">
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
                    <v-btn
                        @click="acceptAnnouncementEstimate({ estimateId: estimate.id, announcementId: estimate.announcementId })"
                    >
                        Oui
                    </v-btn>
                    <v-btn
                        @click="dialog = false"
                    >
                        Non
                    </v-btn>
                </div>
            </div>
        </v-card>
    </v-dialog>

</template>

<script setup lang="ts">
import {PropType, ref} from "vue";
import {EstimateI} from "@/interfaces/estimate";
import {useEstimateStore} from "@/stores/estimate";

const estimateStore = useEstimateStore()
const { acceptAnnouncementEstimate } = estimateStore

const dialog = ref()
const props = defineProps({
    estimate: {
        type: Object as PropType<EstimateI>
    }
})
</script>

<style scoped>

</style>