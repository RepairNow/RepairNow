<template>
    <v-dialog
            v-model="dialog"
            transition="dialog-bottom-transition"
            :fullscreen="isSizeMD"
    >
        <template v-slot:activator="{ props }">
            <div
                v-bind="props"
                class="tw-w-full"
            >
                <slot name="button">
                    <v-btn
                            color="primary"
                            class="lg:tw-bottom-0 tw-w-full"
                    >
                        Laisser un avis
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
                    Laisser un avis
                </p>
            </div>
            <div>
                <v-rating v-model="reviewForm.rating" />
                <v-text-field variant="filled" label="Commentaire" v-model="reviewForm.comment"/>
                <v-btn
                        text="Envoyer"
                        block
                        class="tw-normal-case"
                        @click="handleAnnouncement()"
                />
            </div>
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
import {PropType, ref} from "vue";
import {useScreenSize} from "@/stores/screen-size";
import {storeToRefs} from "pinia";
import {useAnnouncementStore} from "@/stores/announcement"
import {useRoute} from "vue-router";
import {CreateReview} from "@/interfaces/review";
import {MissionI} from "@/interfaces/mission";

const dialog = ref(false);
const screenSizeStore = useScreenSize()
const { isSizeMD } = storeToRefs(screenSizeStore)

const announcementStore = useAnnouncementStore()
const { create } = announcementStore

const route = useRoute()
const reviewForm = ref<CreateReview>({
    missionId: '',
    rating: 0,
    comment: '',
})

const props = defineProps({
    mission: {
        type: Object as PropType<MissionI>,
        required: true
    }
})

const handleAnnouncement = async () => {
    try {
        await createReviw(route.params.id.toString(),
            {
                missionId: props.mission.id,
                rating: parseFloat(reviewForm.value.rating.toString()),
                comment: reviewForm.value.comment
            })
    } catch (e) {

    } finally {
        reviewForm.value = {
            missionId: '',
            rating: 0,
            comment: '',
        }
    }
}

</script>

<style scoped>

</style>