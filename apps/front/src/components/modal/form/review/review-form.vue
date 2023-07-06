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
                        {{announcement.mission.review[0]?.id?'Modifier votre avis':'Laisser un avis'}}
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
                    {{announcement.mission.review[0]?.id?'Modifier votre avis':'Laisser un avis'}}
                </p>
            </div>
            <div>
                <v-rating v-model="reviewForm.rating" />
                <v-text-field variant="filled" label="Commentaire" v-model="reviewForm.comment"/>
                <v-btn
                        v-if="!announcement.mission.review[0]?.id"
                        text="Envoyer"
                        block
                        class="tw-normal-case"
                        @click="handleReview()"
                />
                <div
                    v-else
                    class="tw-flex tw-gap-4"
                >
                    <v-btn
                            text="Modifier"
                            class="tw-normal-case"
                            @click="handleUpdateReview()"
                    />
                </div>

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
import {AnnouncementI} from "@/interfaces/announcement";

const dialog = ref(false);
const screenSizeStore = useScreenSize()
const { isSizeMD } = storeToRefs(screenSizeStore)

const announcementStore = useAnnouncementStore()
const { createAnnouncementReview, updateAnnouncementReview} = announcementStore

const route = useRoute()
const reviewForm = ref<CreateReview>({
    missionId: '',
    rating: 0,
    comment: '',
})

const props = defineProps({
    announcement: {
        type: Object as PropType<AnnouncementI>,
        required: true
    }
})

const handleReview = async () => {
    try {
        const review = await createAnnouncementReview(
            props.announcement.id,
            {
                missionId: props.announcement.mission.id,
                rating: reviewForm.value.rating,
                comment: reviewForm.value.comment
            }
        )

        props.announcement.mission.review[0] = review
        dialog.value = false
    } catch (e) {
        console.error(e)
    } finally {
        reviewForm.value = {
            missionId: '',
            rating: 0,
            comment: '',
        }
    }
}

const handleUpdateReview = async () => {
    try {
        const review = await updateAnnouncementReview(
            props.announcement.id,
            {
                id: props.announcement.mission.review[0].id,
                missionId: props.announcement.mission.id,
                rating: reviewForm.value.rating,
                comment: reviewForm.value.comment
            }
        )

        props.announcement.mission.review[0] = review
    } catch (e) {
        console.error(e)
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