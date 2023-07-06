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
                        Proposer un devis
                    </v-btn>
                </slot>
            </div>


        </template>

        <v-card class="tw-w-2/3 tw-mx-auto tw-p-4 rounded-lg">
            <div class="tw-flex">
                <v-spacer />
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
                    Proposer un devis
                </p>
            </div>
            <div>
                <v-text-field variant="filled" label="Tarif" type="number" v-model="announcementEstimateForm.price"/>
                <v-text-field variant="filled" label="Description" v-model="announcementEstimateForm.description"/>
                <v-btn
                        text="Confirmer le devis"
                        block
                        class="tw-normal-case"
                        @click="handleAnnouncement()"
                />
            </div>
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {useScreenSize} from "@/stores/screen-size";
import {storeToRefs} from "pinia";
import {useAnnouncementStore} from "@/stores/announcement"
import {CreateEstimate} from "@/interfaces/estimate";
import {useRoute} from "vue-router";

const dialog = ref(false);
const screenSizeStore = useScreenSize()
const { isSizeMD } = storeToRefs(screenSizeStore)

const announcementStore = useAnnouncementStore()
const { createAnnouncementEstimate } = announcementStore

const route = useRoute()
const announcementEstimateForm = ref<CreateEstimate>({
    description: '',
    price: 0,
    images: [],
})

const handleAnnouncement = async () => {
    try {
        await createAnnouncementEstimate(route.params.id.toString(),
            {
                price: parseFloat(announcementEstimateForm.value.price.toString()),
                description: announcementEstimateForm.value.description,
                images: announcementEstimateForm.value.images
            });
        dialog.value = false;
    } catch (e) {

    } finally {
        announcementEstimateForm.value = {
            description: '',
            price: 0,
            images: [],
        }
    }
}

</script>

<style scoped>

</style>
