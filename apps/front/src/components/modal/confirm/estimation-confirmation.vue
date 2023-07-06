<template>
    <v-dialog
            v-model="dialog"
            transition="dialog-bottom-transition"
    >
        <template v-slot:activator="{ props }">
            <div v-bind="props">
                <slot name="button">
                    <v-btn color="primary">Selectionner cette offre</v-btn>
                </slot>
            </div>
        </template>

        <v-card v-if="estimate" class="tw-w-2/3 tw-mx-auto tw-p-4 rounded-lg">
            <div class="tw-flex">
                <v-spacer />
                <v-btn icon="mdi-close" color="none" @click="dialog = false" />
            </div>
            <div>
                <p
                        class="tw-text-3xl tw-font-bold tw-flex tw-items-center tw-h-16">
                    Êtes-vous sûr de vouloir selectionnez cette offre ?
                </p>
            </div>
            <div class="grid-container">
                <div class="tw-py-4">
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
                </div>
                <div class="tw-flex tw-gap-x-3">
                    <v-btn
                        @click="acceptEstimate()"
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
import {PropType, ref, toRefs} from "vue";
import {EstimateI} from "@/interfaces/estimate";
import {useEstimateStore} from "@/stores/estimate";
const props = defineProps({
    estimate: {
        type: Object as PropType<EstimateI>,
        required: true
    }
})

const { estimate } = toRefs(props);
const estimateStore = useEstimateStore()
const { acceptAnnouncementEstimate } = estimateStore
const dialog = ref()

const acceptEstimate = async () => {
    try {
        await acceptAnnouncementEstimate({ estimateId: estimate.value.id, announcementId: estimate.value.announcementId });
        dialog.value = false;
    } catch (error) {
        
    }
}

</script>

<style scoped>

</style>
