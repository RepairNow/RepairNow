<template>
	<div class="tw-flex tw-flex-col tw-gap-5 tw-m-5 xl:tw-mx-64">
		<div class="tw-flex tw-justify-between tw-items-center">
			<div class="tw-font-bold tw-text-2xl lg:tw-text-4xl">
				Mon profil
			</div>
			<div id="MyPP">
				<img
					src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
					alt="Avatar"
					class="tw-rounded-full tw-w-full tw-h-full tw-object-cover" />
				<v-icon
					icon="mdi-pencil"
					class="tw-absolute tw-right-0 tw-bottom-0 tw-rounded-full tw-bg-primary-darken-1 tw-text-white tw-p-4 tw-cursor-pointer"
					size="26" />
				<span class="tw-font-bold tw-whitespace-nowrap tw-absolute"
					>{{ currentUserAllInfos?.firstname }}
					{{ currentUserAllInfos?.lastname }}
				</span>
			</div>
		</div>
		<section class="tw-flex tw-flex-col">
			<span class="tw-mt-5">
				<span class="tw-font-bold">Email:</span>
				{{ currentUserAllInfos?.email }}
				<span v-if="currentUserAllInfos?.isEmailVerified"> ✅ </span>
				<span v-if="isEmailSent" class="tw-font-bold">
					email envoyé! 📨
				</span>
				<v-btn
					v-if="!currentUserAllInfos?.isEmailVerified && !isEmailSent"
					size="small"
					variant="outlined"
					color="error"
					@click="handleSendVerifMail()">
					Vérifier mon email
				</v-btn>
			</span>
			<span class="tw-mt-5">
				<span class="tw-font-bold">Numéro de téléphone:</span>
				{{ currentUserAllInfos?.phoneNumber }}
				<span
					class="tw-font-bold"
					v-if="currentUserAllInfos?.isPhoneVerified">
					✅
				</span>
				<v-btn
					v-else
					size="small"
					variant="outlined"
					color="error"
					@click="isPhoneDialogOpened = true">
					Vérifier mon numéro
				</v-btn>
			</span>
			<span
				class="tw-text-center tw-mt-96"
				v-if="
					!currentUserAllInfos?.isPhoneVerified ||
					!currentUserAllInfos?.isEmailVerified
				"
				>Envie de <span class="tw-font-bold">devenir prestataire</span>?
				Faites
				<span class="tw-text-red-800 tw-font-bold">vérifier</span> vos
				informations et faites la demande!</span
			>
			<v-btn v-else variant="text" class="tw-w-fit tw-m-auto"
				>Devenir prestataire</v-btn
			>
		</section>
		<v-dialog
			v-model="isPhoneDialogOpened"
			transition="dialog-bottom-transition"
			:width="isSizeLG ? '100%' : 'auto'"
			:fullscreen="isSizeLG">
			<v-card class="tw-p-5 tw-place-content-center">
				<h2 class="tw-font-bold tw-text-2xl tw-text-center">
					Vous êtes sur le point d'effectuer une vérification de
					numéro de téléphone
				</h2>
				<p v-if="!isSMSSent" class="tw-text-center">
					Un code de vérification va vous être envoyé par SMS
				</p>
				<p v-else class="tw-text-center tw-font-bold">
					Saisissez le code reçu par SMS
				</p>
				<!-- TODO: see why i can't have this v-model="currentUserAllInfos?.phoneNumber" -->
				<v-text-field
					v-if="!isSMSSent"
					class="tw-mt-5 tw-w-48 tw-m-auto tw-inline-block"
					label="Numéro de téléphone"
					v-model="phoneNumberInput"
					type="tel"
					:rules="[
						(value) =>
							(value.length > 9 &&
								value
									.split('')
									.every((char: number) => !isNaN(char))) ||
							'Veuillez renseigner votre numéro de téléphone',
					]"
					required
					:disabled="
						currentUserAllInfos?.isPhoneVerified || isSMSSent
					" />

				<v-text-field
					v-else
					class="tw-mt-5 tw-w-48 tw-m-auto tw-inline-block"
					label="Code reçu par SMS"
					v-model="codeReceivedInput"
					type="tel"
					required />

				<div class="tw-flex tw-justify-evenly">
					<v-btn
						class="tw-mt-5"
						color="primary"
						variant="text"
						@click="isPhoneDialogOpened = false">
						Annuler
					</v-btn>
					<v-btn
						v-if="!isSMSSent"
						:disabled="isSMSSent || phoneNumberInput.length < 10"
						class="tw-mt-5"
						color="primary"
						@click="handleSendSMS()">
						Envoyer 🔐
					</v-btn>
					<v-btn
						v-else
						:disabled="codeReceivedInput.length < 3"
						class="tw-mt-5"
						color="primary"
						@click="handleVerifyCode('1234')">
						Vérifier le code 🔓
					</v-btn>
				</div>
			</v-card>
		</v-dialog>
	</div>
</template>

<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
import { createToast } from "mosha-vue-toastify";
import { ref } from "vue";
import { useScreenSize } from "@/stores/screen-size";

const userStore = useUserStore();
const { getSelfAllInfos } = userStore;
const { currentUserAllInfos } = storeToRefs(userStore);

/** Email Verif */
const isEmailSent = ref(false);
const handleSendVerifMail = () => {
	isEmailSent.value = true;
	createToast("Email de vérification envoyé", {
		type: "success",
		position: "top-right",
		timeout: 4000,
	});
};

/** Phone Verif */
const screenSize = useScreenSize();
const { isSizeLG } = storeToRefs(screenSize);
const isPhoneDialogOpened = ref(false);
const isSMSSent = ref(false);
const phoneNumberInput = ref("");
const handleSendSMS = () => {
	isSMSSent.value = true;
	createToast("SMS de vérification envoyé", {
		type: "success",
		position: "top-right",
		timeout: 4000,
	});
};
const codeReceivedInput = ref("");
const handleVerifyCode = (code: string) => {
	console.log("code");
};

onMounted(async () => {
	await getSelfAllInfos();
});
</script>

<style scoped>
#MyPP {
	position: relative;
	width: 100px;
	height: 100px;
	background-color: silver;
	border-radius: 50%;
	box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
}
</style>
