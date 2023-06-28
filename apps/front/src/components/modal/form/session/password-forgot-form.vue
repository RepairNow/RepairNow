<template>
    <v-dialog v-model="dialog" transition="dialog-bottom-transition" :fullscreen="isSizeLG">
        <template v-slot:activator="{ props }">
            <div v-bind="props">
                <slot name="button">
                    <v-btn color="primary">
                        Mot de passe oublié
                    </v-btn>
                </slot>
            </div>
        </template>

        <v-card class="tw-w-1/3 tw-mx-auto tw-p-4 rounded-lg">
            <div class="tw-flex">
                <v-spacer />
                <v-btn icon="mdi-close" color="none" @click="dialog = false" />
            </div>
            <img :src="forgotPassword" alt="login svg" id="imgForgotPassword" />
            <h2 class="tw-text-xl tw-py-2 tw-w-full tw-font-bold">
                Mot de passe oublié?
            </h2>
            <small class="tw-text-left">
                Veuillez saisir votre adresse e-mail ci-dessous. Si l'adresse email est valide, Nous vous enverrons un
                e-mail contenant le lien de réinitialisation de mot de passe
            </small>
            <form @submit.prevent="handleForgotPassword" class="tw-mt-5">
                <p class="tw-text-center tw-text-red-500 tw-pb-2">{{ formError }}</p>
                <v-text-field label="Adresse email" class="tw-secondary-darken-1" v-model="resetPasswordForm.email"
                    type="email" required :rules="[rules.required, rules.email]" variant="filled" />
                <v-btn type="submit" color="primary" class="tw-w-full" :disabled="isForgotPasswordSent"
                    @click="handleForgotPassword">
                    <template v-if="isForgotPasswordSent">
                        <v-progress-circular indeterminate :size="20" />
                    </template>
                    <template v-else> Envoyer </template>
                </v-btn>
            </form>
            <span
                class="tw-text-primary hover:tw-text-primary-darken-1 hover:tw-underline tw-pt-2 tw-text-center tw-text-sm"
                @click="dialog = false">Se connecter</span>
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useScreenSize } from "@/stores/screen-size";
import { storeToRefs } from "pinia";
import { useUserStore } from "@/stores/user";
import { ResetPassword } from "@/interfaces/user";
import forgotPassword from "@/assets/svg/forgot-password.svg";

const screenSize = useScreenSize();
const { isSizeLG } = storeToRefs(screenSize);
const { resetPassword } = useUserStore();

const dialog = ref(false);
const resetPasswordForm = ref<ResetPassword>({
    email: ""
});
const formError = ref("");
const isDialogOpened = ref(false);
const isForgotPasswordSent = ref(false);

const handleForgotPassword = async () => {
    if (checkForm() && checkIsEmail()) {
        formError.value = ''

        isForgotPasswordSent.value = true;
        await resetPassword(resetPasswordForm)
        isForgotPasswordSent.value = false;
        isDialogOpened.value = false;

    } else {
        formError.value = 'Certains champs sont manquants ou invalides.'
    }
}

const checkForm = () => {
    return Object.values(resetPasswordForm.value).every(value => !!value);
}

const checkIsEmail = () => {
    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return pattern.test(resetPasswordForm.value.email);
}

const rules = ref({
    required: value => !!value || 'Ce champs est requis.',
    email: value => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return pattern.test(value) || 'Email invalide.'
    },
})
</script>

<style scoped></style>