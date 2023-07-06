<template>
    <div v-if="myUser" class="tw-flex tw-flex-col tw-gap-5 tw-m-5 xl:tw-mx-64">
        <div class="tw-flex tw-justify-between tw-items-center">
            <div class="tw-font-bold tw-text-2xl lg:tw-text-4xl">
                Mon profil
            </div>
            <div
                    class="tw-flex tw-flex-col tw-justify-center tw-relative tw-items-center">
                <div id="MyPP">
                    <img
                            v-if="previewUrl"
                            :src="previewUrl"
                            alt="Avatar"
                            class="tw-rounded-full tw-w-full tw-h-full tw-object-cover" />
                    <span
                            v-else
                            class="tw-font-bold tw-text-4xl tw-absolute tw-w-full tw-bottom-2/4 tw-translate-y-2/4 tw-text-center tw-text-white">
						{{
                            getInitialsFromFirstnameAndLastname(
                                    myUser?.firstname,
                                    myUser?.lastname
                            )
                        }}
					</span>
                    <file-input-custom
                            v-model="fileInput"
                            @input="(e: any) => handlePPChange(e)" />
                </div>
                <span class="tw-font-bold tw-whitespace-nowrap"
                >{{ myUser?.firstname }}
					{{ myUser?.lastname }}
				</span>
            </div>
        </div>
        <section class="tw-flex tw-flex-col">
			<span class="tw-mt-5">
				<span class="tw-font-bold">Email:</span>
				{{ myUser?.email }}
				<span v-if="myUser?.isEmailVerified"> ✅ </span>
				<span v-if="isEmailSent" class="tw-font-bold">
					email envoyé! 📨
				</span>
				<v-btn
                        v-if="!myUser?.isEmailVerified && !isEmailSent"
                        size="small"
                        variant="outlined"
                        color="error"
                        @click="handleSendVerifMail()">
					Vérifier mon email
				</v-btn>
			</span>
            <span class="tw-mt-5">
				<span class="tw-font-bold">Numéro de téléphone:</span>
				{{ myUser?.phoneNumber }}
				<span class="tw-font-bold" v-if="myUser?.isPhoneVerified">
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
            <div
                    v-if="!(myUser?.role === 'ADMIN')"
                    class="tw-text-center tw-mt-96">
				<span
                        v-if="!myUser?.isPhoneVerified || !myUser?.isEmailVerified"
                >Envie de
					<span class="tw-font-bold">devenir prestataire</span>?
					Faites
					<span class="tw-text-red-800 tw-font-bold">vérifier</span>
					vos informations et faites la demande!</span
                >
                <v-btn v-else variant="text" class="tw-w-fit tw-m-auto"
                >Devenir prestataire</v-btn
                >
            </div>
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
                <v-text-field
                        v-if="!isSMSSent"
                        class="tw-mt-5 tw-w-48 tw-m-auto tw-inline-block"
                        label="Téléphone"
                        v-model="myUser.phoneNumber"
                        type="tel"
                        append-inner-icon="mdi-cellphone"
                        :rules="[
						(value) =>
							(value.length > 9 && value.length < 13) ||
							'10 à 12 chiffres attendus',
					]"
                        required
                        :disabled="myUser?.isPhoneVerified || isSMSSent" />

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
                            :disabled="
							isSMSSent || !isPhoneIsValid(myUser?.phoneNumber)
						"
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
                            @click="handleVerifyCode(codeReceivedInput)">
                        Vérifier le code 🔓
                    </v-btn>
                </div>
            </v-card>
        </v-dialog>
        <span>
            <span class="tw-font-bold">Date de naissance :</span>
            {{ myUser?.birthdate ? myUser?.birthdate : 'Non renseigné' }}
        </span>
        <span>
            <span class="tw-font-bold">Rôle :</span>
            {{ myUser?.role }}
        </span>

        <div>
            <p class="tw-text-3xl tw-font-bold">
                Gain du mois
            </p>
        </div>

    </div>
</template>

<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
import { createToast } from "mosha-vue-toastify";
import { ref } from "vue";
import { useScreenSize } from "@/stores/screen-size";
import FileInputCustom from "@/components/FileInputCustom.vue";
import { watch } from "vue";
import imageService from "@/services/api/image";
import userService from "@/services/api/user";

const myUser = ref();
const fileInput = ref();
const { getSelfAllInfos } = useUserStore();
const { getImage } = imageService;
const { _uploadAvatar, _sendSMSVerif, _checkCodeReceived } = userService;

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
const isPhoneIsValid = (num: string) => {
    return num.length > 9 && num.length < 13;
};
const parsePhoneNumber = (num: string) => {
    // convert 06123456789 to +336123456789
    // return `+33${num.slice(1)}`;
    return num.replace(/^0/, "+33");
};
const screenSize = useScreenSize();
const { isSizeLG } = storeToRefs(screenSize);
const isPhoneDialogOpened = ref(false);
const isSMSSent = ref(false);
const handleSendSMS = async () => {
    isSMSSent.value = true;
    await _sendSMSVerif(parsePhoneNumber(myUser.value.phoneNumber));
    createToast("SMS de vérification envoyé", {
        type: "success",
        position: "top-right",
        timeout: 4000,
    });
};
const codeReceivedInput = ref("");
const handleVerifyCode = async (code: string) => {
    const resCodeCheck = await _checkCodeReceived(code);
    if (resCodeCheck) {
        createToast("Numéro de téléphone vérifié", {
            type: "success",
            position: "top-right",
            timeout: 4000,
        });
        isPhoneDialogOpened.value = false;
        myUser.value.isPhoneVerified = true;
    }
};

/** Profile picture */
let formData = new FormData();
const previewUrl = ref();
const handlePPChange = async (event: any) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            previewUrl.value = e.target?.result;
        };
        reader.readAsDataURL(file);
        formData.append("file", file);
        await _uploadAvatar(formData);
    }
};
const getInitialsFromFirstnameAndLastname = (
    firstname: string,
    lastname: string
) => {
    if (!firstname || !lastname) return;
    return `${firstname[0].toUpperCase()}${lastname[0].toUpperCase()}`;
};
watch(
    () => myUser.value,
    async () => {
        if (myUser.value) {
            if (myUser.value.avatar?.[0]?.id) {
                previewUrl.value = await getImage(myUser.value.avatar[0].id);
            }
        }
    }
);

onMounted(async () => {
    myUser.value = await getSelfAllInfos();
});
</script>

<style scoped>
#MyPP {
    position: relative;
    width: 100px;
    height: 100px;
    background-color: #424242;
    border-radius: 50%;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
}
</style>
