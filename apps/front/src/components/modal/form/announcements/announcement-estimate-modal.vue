<template>
    <v-dialog
            v-model="dialog"
            transition="dialog-bottom-transition"
            :fullscreen="isSizeMD"
    >
        <template v-slot:activator="{ props }">
            <div
                    v-bind="props"
            >
                <slot name="button">
                    <v-btn
                            color="primary"
                            class="tw-absolute tw-bottom-20 tw-right-10 lg:tw-relative lg:tw-bottom-0 "
                    >
                        Voir mon devis - {{estimate.currentStatus}}
                    </v-btn>
                </slot>
            </div>


        </template>

        <v-card class="tw-w-2/3 tw-mx-auto tw-p-4 rounded-lg">
            <div class="tw-flex">
                <v-btn
                        icon="mdi-close"
                        color="none"
                        @click="dialog = false"

                />
            </div>
            <div class="mb-4">
                <p
                        class="tw-text-3xl tw-font-bold tw-flex tw-items-center tw-h-16"
                >
                    Mon devis
                </p>
            </div>
            <div>
                <v-text-field variant="filled" label="Tarif" type="number" v-model="announcementEstimateForm.price"/>
                <v-text-field variant="filled" label="Description" v-model="announcementEstimateForm.description"/>
                <v-btn
                        text="Mettre à jour le devis"
                        block
                        class="tw-normal-case"
                        @click="handleAnnouncement()"
                />
            </div>
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
import {onMounted, PropType, ref} from "vue";
import {useScreenSize} from "@/stores/screen-size";
import {storeToRefs} from "pinia";
import {useAnnouncementStore} from "@/stores/announcement"
import {useRoute} from "vue-router";
import {AnnouncementI} from "@/interfaces/announcement";
import {CreateEstimate, EstimateI} from "@/interfaces/estimate";
import announcement from "@/services/api/announcement";

const dialog = ref(false);
const screenSizeStore = useScreenSize()
const { isSizeMD } = storeToRefs(screenSizeStore)

const announcementStore = useAnnouncementStore()

const props = defineProps({
    announcement: {
        type: Object as PropType<AnnouncementI>,
        required: true
    },
    estimate: {
        type: Object as PropType<EstimateI>,
        required: true
    }
})
const route = useRoute()
const announcementEstimateForm = ref<CreateEstimate>({
    description: '',
    price: 0,
    images: [],
})

onMounted(() => {
    announcementEstimateForm.value.description = props.estimate?.description
    announcementEstimateForm.value.price =  props.estimate?.price
})

</script>

<style scoped>

</style>