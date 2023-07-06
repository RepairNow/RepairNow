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
				<v-btn icon="mdi-close" color="none" @click="dialog = false" />
			</div>
            <div class="tw-flex tw-flex-col tw-items-center tw-justify-center tw-text-center">
                <div class="tw-flex tw-flex-col tw-items-center tw-justify-center tw-text-center">
                    <div class="tw-font-bold tw-text-xl tw-mb-4">Valider la mission</div>
                    <v-text-field type="number" class="tw-w-32" v-model="code"/>
                    <p>Pour valider la mission, veuillez renseigner le code de validation partager par votre prestataire</p>
                    <v-btn
                        class="mt-5"
                        @click="validateCode(mission.id, parseInt(code))"
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
import { useRouter } from "vue-router";
import {useValidationCodeStore} from "@/stores/validation-code";
import {MissionI} from "@/interfaces/mission";

const props = defineProps({
    mission: {
        type: Object as PropType<MissionI>
    }
})

const validationCodeStore = useValidationCodeStore()
const {validateCode} = validationCodeStore
const {validationCode} = storeToRefs(validationCodeStore)

const dialog = ref(false);
const code = ref('')

const screenSizeStore = useScreenSize();
const { isSizeLG } = storeToRefs(screenSizeStore);

const router = useRouter();
</script>
