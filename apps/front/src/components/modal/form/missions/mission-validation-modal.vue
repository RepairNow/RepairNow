<template>
	<v-dialog
		v-model="dialog"
		transition="dialog-bottom-transition"
		:fullscreen="isSizeLG">
		<template v-slot:activator="{ props }">
			<div v-bind="props">
				<slot name="button">
					<v-btn class="" block> Valider la mission </v-btn>
				</slot>
			</div>
		</template>

		<v-card class="tw-w-2/3 tw-mx-auto tw-p-4 rounded-lg">
			<div class="tw-flex">
				<v-spacer></v-spacer>
				<v-btn icon="mdi-close" color="none" @click="() => {
                        dialog = false;
                        error = ''
				    }"
                />
			</div>
            <div class="tw-flex tw-flex-col tw-items-center tw-justify-center tw-text-center">
                <div class="tw-flex tw-flex-col tw-items-center tw-justify-center tw-text-center">
                    <div class="tw-font-bold tw-text-xl tw-mb-4">Valider la mission</div>
                    <p class="tw-text-red-400">{{error}}</p>
                    <v-text-field type="number" class="tw-w-32" v-model="code"/>
                    <p>Pour valider la mission, veuillez renseigner le code de validation partager par votre prestataire</p>
                    <v-btn
                        class="mt-5"
                        @click="validateFourDigitCode()"
                    >
                        Confirmer
                    </v-btn>
                </div>
            </div>
		</v-card>
	</v-dialog>
</template>

<script setup lang="ts">
import {PropType, ref} from "vue";
import { useScreenSize } from "@/stores/screen-size";
import { storeToRefs } from "pinia";
import {useRoute, useRouter} from "vue-router";
import {useValidationCodeStore} from "@/stores/validation-code";
import {MissionI} from "@/interfaces/mission";
import {useAnnouncementStore} from "@/stores/announcement";

const props = defineProps({
    mission: {
        type: Object as PropType<MissionI>,
        required: true
    }
})

const validationCodeStore = useValidationCodeStore()
const {validateCode} = validationCodeStore
const {validationCode} = storeToRefs(validationCodeStore)
const {getAnnouncement} = useAnnouncementStore()
const route = useRoute()

const dialog = ref(false);
const code = ref('')

const screenSizeStore = useScreenSize();
const { isSizeLG } = storeToRefs(screenSizeStore);

const router = useRouter();

const error = ref('')
const validateFourDigitCode = async () => {
	try {
		await validateCode(props.mission.id, parseInt(code.value))
		dialog.value = false;
        await getAnnouncement(route.params.id.toString())
    } catch (e: any) {
        error.value = e.response.data.message
		console.error(e);
	}
}
</script>
