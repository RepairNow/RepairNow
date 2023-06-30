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
                    >
                        Proposer un devis
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
                    Proposer un devis
                </p>
            </div>
            <div>
                <v-text-field variant="filled" label="Tarif" type="" v-model="announcementEstimateForm.title"/>
                <v-text-field variant="filled" label="Description" v-model="announcementEstimateForm.description"/>
                <!--<v-file-input variant="filled" label="Images" v-model="announcementForm.images"/>-->
                <v-btn
                        text="S'inscrire"
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
import {CreateAnnouncement} from "@/interfaces/announcement";
import {useScreenSize} from "@/stores/screen-size";
import {storeToRefs} from "pinia";
import {useAnnouncementStore} from "@/stores/announcement"
import {CreateEstimate} from "@/interfaces/estimate";

const dialog = ref(false);
const screenSizeStore = useScreenSize()
const { isSizeMD } = storeToRefs(screenSizeStore)

const announcementStore = useAnnouncementStore()
const { createAnnouncement } = announcementStore

const announcementEstimateForm = ref<CreateEstimate>({
    description: '',
    price: 0,
    images: [],
})

const handleAnnouncement = async () => {
    try {
        await createAnnouncementEstimate(announcementEstimateForm.value)
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