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
                        Obtenir un réparateur
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
                    Demander un service
                </p>
            </div>
            <div>
                <v-text-field variant="filled" label="Titre" v-model="announcementForm.title"/>
                <v-text-field variant="filled" label="Description" v-model="announcementForm.description"/>
                <!--<v-file-input variant="filled" label="Images" v-model="announcementForm.images"/>-->
                <v-text-field variant="filled" label="Adresse" v-model="announcementForm.address"/>
                <v-text-field type="date" variant="filled" label="Date de début" v-model="announcementForm.startTime"/>
                <v-text-field type="date" variant="filled" label="Date de fin" v-model="announcementForm.endTime"/>
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

const dialog = ref(false);
const screenSizeStore = useScreenSize()
const { isSizeMD } = storeToRefs(screenSizeStore)

const announcementStore = useAnnouncementStore()
const { createAnnouncement } = announcementStore

const announcementForm = ref<CreateAnnouncement>({
    title: '',
    description: '',
    images: [],
    address: '',
    startTime: new Date(),
    endTime: new Date(),
})

const handleAnnouncement = async () => {
    try {
        await createAnnouncement(announcementForm.value)
    } catch (e) {

    } finally {
        announcementForm.value = {
            title: '',
            description: '',
            images: [],
            address: '',
            startTime: new Date(),
            endTime: new Date(),
        }
    }
}

//todo pour le path post announcement, set le current user automatiquement


</script>

<style scoped>

</style>