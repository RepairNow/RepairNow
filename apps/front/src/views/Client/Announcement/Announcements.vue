<template>
    <div class="tw-m-5 xl:tw-mx-64">
        <div class="tw-font-bold tw-text-2xl lg:tw-text-4xl">
            Mes demandes
        </div>
        <div class="tw-flex tw-gap-2 tw-my-6">
            <v-btn
                class="tw-rounded-full"
            >
                En cours
            </v-btn>
            <v-btn
                class="tw-rounded-full"
            >
                Terminées
            </v-btn>
        </div>
        <div
            v-if="announcements.length"
            class="tw-flex tw-flex-col tw-gap-4 tw-my-4"
        >
            <announcement
                v-for="announcement in announcements"
                class="tw-p-3 border"
                :announcement="announcement"
            />
        </div>
        <div
            v-else
            class="tw-flex tw-flex-col tw-items-center tw-justify-center tw-my-32 tw-gap-4"
        >
            <p class="tw-font-bold lg:tw-text-2xl tw-text-lg">Aucune demande en cours</p>
            <p>Faites une demande de service et trouvez un prestataire en quelques minutes</p>
            <announcements-modal>
                <template #button>
                    <v-btn>
                        Demander un service
                    </v-btn>
                </template>
            </announcements-modal>
        </div>
    </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import AnnouncementsModal from "@/components/modal/form/announcements/announcements-modal.vue";
import Announcement from "@/components/annoucement/annoucement.vue";
import {useAnnouncementStore} from "@/stores/announcement";
import {storeToRefs} from "pinia";

const annoucementsStore = useAnnouncementStore()
const {announcements} = storeToRefs(annoucementsStore)
const {getAnnouncements} = annoucementsStore

onMounted(async () => {
    await getAnnouncements()
});
</script>

<style scoped>

</style>