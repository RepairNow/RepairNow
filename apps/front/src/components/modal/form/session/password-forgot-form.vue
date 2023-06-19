<template>
    <v-dialog
            v-model="dialog"
            transition="dialog-bottom-transition"
    >
        <template v-slot:activator="{ props }">
            <div
                v-bind="props"
            >
                <slot name="button">
                    <v-btn
                            color="primary"
                    >
                        Mot de passe oublié
                    </v-btn>
                </slot>
            </div>
        </template>

        <v-card class="tw-w-1/3 tw-mx-auto tw-p-4 rounded-lg">
            <div class="tw-flex">
                <v-spacer/>
                <v-btn
                        icon="mdi-close"
                        color="none"
                        @click="dialog = false"

                />
            </div>
            <img
                    src="src/assets/svg/forgot-password.svg"
                    alt="login svg"
                    id="imgForgotPassword" />
            <h2
                    class="tw-text-xl tw-py-2 tw-w-full tw-font-bold">
                Mot de passe oublié?
            </h2>
            <small class="tw-text-left">
                Veuillez saisir votre adresse e-mail ci-dessous. Si l'adresse email est valide, Nous vous enverrons un e-mail contenant le lien de réinitialisation de mot de passe
            </small>
            <form
                    @submit.prevent="handleForgotPassword"
                    class="tw-mt-5">
                <v-text-field
                        label="Adresse email"
                        class="tw-secondary-darken-1"
                        v-model="emailForgotPassword"
                        type="email"
                        required
                        variant="filled"
                />
                <v-btn
                        type="submit"
                        color="primary"
                        class="tw-w-full"
                        :disabled="isForgotPasswordSent"
                        @click="handleClickForgotPassword">
                    <template v-if="isForgotPasswordSent">
                        <v-progress-circular
                                indeterminate
                                :size="20" />
                    </template>
                    <template v-else> Envoyer </template>
                </v-btn>
            </form>
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
    import {ref} from "vue";

    const dialog = ref(false)
    const email = ref("");
    const password = ref("");
    const errorMessage = ref("");
    const isSent = ref(false);
    const isDialogOpened = ref(false);
    const emailForgotPassword = ref("");
    const isForgotPasswordSent = ref(false);

    const handleForgotPassword = () => {
        console.log("send email to reset password", emailForgotPassword.value);
        isForgotPasswordSent.value = true;

        setTimeout(() => {
            isForgotPasswordSent.value = false;
            isDialogOpened.value = false;
        }, 1000);
    };
</script>

<style scoped>

</style>