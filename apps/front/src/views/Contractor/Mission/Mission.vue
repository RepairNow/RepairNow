<template>
    <div class="tw-flex tw-flex-col">
        <div class="tw-w-full tw-bg-primary tw-h-32 md:tw-h-64">
            Image
        </div>
        <div class="tw-w-full tw-p-10" v-if="mission.announcement">
            <div class="tw-flex tw-flex-col xl:tw-flex-row">
                <div class="xl:tw-w-full tw-flex tw-flex-col tw-gap-4">
                    <div class="tw-flex tw-items-center tw-w-full">
                        <div class="tw-grow-1 tw-w-full tw-text-xl tw-font-bold xl:tw-text-4xl tw-flex tw-items-center">
                            {{ mission.announcement.title }} <span class="tw-text-white tw-text-lg lg:tw-text-2xl tw-bg-primary tw-py-1 tw-px-2 tw-mx-4 tw-rounded-md">{{ mission.announcement.currentStatus }}</span>
                        </div>
                        <div class="tw-flex">
                            <v-btn
                                v-if="mission.validationCode?.currentStatus === 'PENDING'"
                                @click="contractorConfirmation(mission.id)"
                            >
                                Valider la mission
                            </v-btn>
                            <div v-else-if="mission.validationCode?.currentStatus === 'WAITING FOR APPROVAL'">
                                Code de validation
                                <v-btn>
                                    {{ validationCode.code }}
                                </v-btn>
                            </div>
                            <div v-else>
                                <v-btn>
                                    Mission valider
                                </v-btn>
                            </div>
                        </div>
                    </div>
                    <div class="tw-flex tw-gap-4 tw-flex-wrap">
                        <div class="tw-p-2 tw-bg-primary tw-rounded-lg tw-text-white tw-flex tw-gap-2">
                            <v-icon icon="mdi-calendar-outline" /><span>{{ startTime }}</span>
                        </div>
                        <div class="tw-p-2 tw-bg-primary tw-rounded-lg tw-text-white tw-flex tw-gap-2">
                            <v-icon icon="mdi-clock-outline" /><span>{{mission.announcement.estimatedTime}} heures</span>
                        </div>
                        <a
                                class="tw-p-2 tw-bg-primary tw-rounded-lg tw-text-white tw-flex tw-gap-2 hover:tw-bg-primary/90"
                                :href="`https://www.google.com/maps/search/${mission.announcement.address}`"
                        >
                            <v-icon icon="mdi-map-outline"/><span>{{mission.announcement.address}}</span><v-icon icon="mdi-link"/>
                        </a>
                        <div
                                class="tw-p-2 tw-bg-primary tw-rounded-lg tw-text-white tw-flex tw-gap-2"
                        >
                            <v-icon icon="mdi-tools"/><span>{{mission.announcement?.job?.title}}</span>
                        </div>
                    </div>
                    <div class="">
                        <p>
                            {{mission.announcement.description}}
                        </p>
                    </div>
                    <div class="tw-flex tw-gap-4 tw-flex-wrap">
                        <div v-for="i in 5"
                             class="tw-w-full sm:tw-w-64 tw-h-64 tw-bg-primary tw-text-white tw-p-3"
                        >
                            Image {{i}}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import {storeToRefs} from "pinia";
import {onMounted, ref} from "vue";
import {useRoute} from "vue-router";
import {useUserStore} from "@/stores/user";
import {useMissionStore} from "@/stores/mission";
import {useValidationCodeStore} from "@/stores/validation-code";

const missionStore = useMissionStore()
const {mission} = storeToRefs(missionStore)
const {getMission} = missionStore
const {currentUser} = storeToRefs(useUserStore())

const validationStore = useValidationCodeStore()
const {validateCode, getValidationCode, contractorConfirmation} = validationStore
const {validationCode} = storeToRefs(validationStore)

const dialog = ref(false)
const route = useRoute()

const startTime = ref('')

const filteredArray = ref()
onMounted(async () => {
    await getMission(route.params.id.toString())
    const estimates = mission.value.announcement.estimates
    filteredArray.value = estimates?.filter(estimate => estimate.prestataire.sub === currentUser.value?.id || estimate.currentStatus === 'WAITING_PAYMENT');
    startTime.value = new Date(mission.value.announcement.startTime).toLocaleString('fr-FR', { day: "2-digit", month: "long", hour: "2-digit", minute: "2-digit" })

    if (mission.value.validationCode.currentStatus === 'WAITING FOR APPROVAL') {
        await getValidationCode(mission.value.id)

        if(validationCode.value) {
            mission.value.validationCode.currentStatus = validationCode.value.currentStatus
        }
    }
})

</script>

<style scoped>

</style>