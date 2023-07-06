<template>
    <div class="tw-m-5 xl:tw-mx-64">
        <div class="tw-font-bold tw-text-2xl lg:tw-text-4xl">
            Mes missions
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
                v-if="missions.length"
                class="tw-flex tw-flex-col tw-gap-4 tw-my-4"
        >
            <mission
                    v-for="mission in missions"
                    class="tw-p-3 border"
                    :mission="mission"
            />
        </div>
        <div
                v-else
                class="tw-flex tw-flex-col tw-items-center tw-justify-center tw-my-32 tw-gap-4"
        >
            <p class="tw-font-bold lg:tw-text-2xl tw-text-lg">Aucune mission en cours</p>
            <router-link
                    :to="{name: 'contractor-announcements'}"
                    class="tw-rounded-md tw-border-0 tw-bg-primary tw-text-white tw-p-2"
            >
                Voir les annonces
            </router-link>
        </div>
    </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import {storeToRefs} from "pinia";
import {useMissionStore} from "@/stores/mission";
import Mission from "@/components/mission/mission.vue";

const missionStore = useMissionStore()
const {missions} = storeToRefs(missionStore)
const {getSelfMissions} = missionStore

onMounted(async () => {
    await getSelfMissions();
});
</script>

<style scoped>

</style>