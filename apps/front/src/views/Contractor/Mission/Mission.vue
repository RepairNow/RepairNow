<template>
    <div class="tw-flex tw-flex-col">
        <div class="tw-w-full tw-p-10" v-if="mission.announcement">
            <div class="tw-flex tw-flex-col xl:tw-flex-row">
                <div class="xl:tw-w-full tw-flex tw-flex-col tw-gap-4">
                    <div class="tw-flex tw-items-center tw-w-full">
                        <div class="tw-grow-1 tw-w-full tw-text-xl tw-font-bold xl:tw-text-4xl tw-flex tw-items-center">
                            {{ mission.announcement.title }} <span class="tw-text-white tw-text-sm tw-bg-primary tw-py-1 tw-px-2 tw-mx-4 tw-rounded-md">{{ mission.announcement.currentStatus }}</span>
                        </div>
                        <div class="tw-flex">
                            <v-btn
                                v-if="mission.validationCode?.currentStatus === 'PENDING'"
                                @click="handleMissionConfirmation()"
                            >
                                Valider la mission
                            </v-btn>
                            <div v-else-if="mission.validationCode?.currentStatus === 'WAITING FOR APPROVAL'">
                                Code de validation
                                <v-btn @click="copyCode">
                                    {{ validationCode.code }}
                                </v-btn>
                            </div>
                            <div v-else>
                                <v-btn>
                                    Mission validée
                                </v-btn>
                            </div>
                        </div>
                    </div>
                    <div class="tw-flex tw-gap-4 tw-flex-wrap">
                        <div class="tw-p-2 tw-bg-primary/20 tw-rounded-lg tw-text-black tw-flex tw-gap-2">
                            <v-icon icon="mdi-calendar-outline" /><span>{{ startTime }}</span>
                        </div>
                        <div class="tw-p-2 tw-bg-primary/20 tw-rounded-lg tw-text-black tw-flex tw-gap-2">
                            <v-icon icon="mdi-clock-outline" /><span>{{mission.announcement.estimatedTime}} heures</span>
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
                            <v-icon icon="mdi-tools"/><span>{{mission.announcement?.job?.title}}</span>
                        </div>
                    </div>
                    <div class="">
                        <p>
                            {{mission.announcement.description}}
                        </p>
                    </div>
                    <div class="tw-flex tw-justify-center sm:tw-justify-start tw-gap-4 tw-flex-wrap tw-rounded-lg tw-pt-4 tw-mx-2">
                        <div v-for="image in mission.announcement.images"
                            class="tw-w-1/2 tw-text-white tw-p-3"
                        >
                            <v-img :src="getImage(image.id)" />
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
import imageService from "@/services/api/image";

const { getImage } = imageService;
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

const handleMissionConfirmation = async () => {
    const res = await contractorConfirmation(mission.value.id);
    mission.value.validationCode = res
}

const copyCode = () => {
    navigator.clipboard.writeText(validationCode.value.code.toString());
}
</script>

<style scoped>

</style>
