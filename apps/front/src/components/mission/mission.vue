<template>
    <div v-if="mission" class="tw-flex tw-flex-col tw-gap-5 tw-shadow-lg tw-rounded-lg tw-p-6">
        <div class="tw-flex tw-items-center tw-gap-x-3 tw-font-bold tw-text-2xl tw-text-slate-800 lg:tw-text-3xl">
            {{ mission.announcement.title }}
            <span class="tw-border-0 tw-text-sm tw-p-2 tw-bg-primary tw-text-white tw-rounded-md tw-whitespace-nowrap">{{mission.currentStatus}}</span>
        </div>
        <div>
            {{ mission.announcement.description }}
        </div>
        <div class="tw-flex tw-flex-col tw-gap-4 tw-mt-4">
            <div class="tw-flex tw-gap-4 tw-flex-wrap">
                <div class="tw-p-2 tw-bg-primary/20 tw-rounded-lg tw-text-black tw-flex tw-gap-2">
                    <v-icon icon="mdi-calendar-outline" /><span>{{ mission.announcement.startTime }}</span>
                </div>
                <div class="tw-p-2 tw-bg-primary/20 tw-rounded-lg tw-text-black tw-flex tw-gap-2">
                    <v-icon icon="mdi-clock-outline" /><span>{{ mission.announcement.estimatedTime }} heures</span>
                </div>
                <a
                        class="tw-p-2 tw-bg-primary/20 tw-rounded-lg tw-text-black tw-flex tw-gap-2 hover:tw-bg-primary/30"
                        :href="`https://www.google.com/maps/search/${mission.announcement.address}`"
                >
                    <v-icon icon="mdi-map-outline"/><span>{{mission.announcement.address}}</span><v-icon icon="mdi-link"/>
                </a>
                <div
                        class="tw-p-2 tw-bg-primary/20 tw-rounded-lg tw-text-black tw-flex tw-gap-2"
                >
                    <v-icon icon="mdi-tools"/><span>{{mission.announcement.job?.title}}</span>
                </div>
            </div>
            <v-btn :to="{name: 'contractor-mission', params: {id: mission.id}}" class="tw-p-2 tw-text-center">
                Voir la mission
            </v-btn>
        </div>
    </div>
</template>

<script setup lang="ts">
import {PropType} from "vue";
import {MissionI} from "@/interfaces/mission";

const props = defineProps({
    mission: {
        type: Object as PropType<MissionI>,
        required: true
    }
})
</script>

<style scoped>

</style>
