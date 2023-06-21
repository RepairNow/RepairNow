<template>
    <v-dialog v-model="dialog" transition="dialog-bottom-transition" :fullscreen="isSizeLG">
        <template v-slot:activator="{ props }">
            <div v-bind="props">
                <slot name="button">
                    <v-btn color="primary">
                        Connexion
                    </v-btn>
                </slot>
            </div>


        </template>

        <v-card class="tw-w-1/3 tw-mx-auto tw-p-4 rounded-lg">
            <div class="tw-flex">
                <v-spacer />
                <v-btn icon="mdi-close" color="none" @click="dialog = false" />
            </div>
            <div class="mb-4">
                <p class="tw-text-3xl tw-font-bold">Content de te revoir!</p>
                <p>Connectez-vous à votre compte</p>
            </div>
            <div class="tw-flex tw-flex-col tw-gap-4">
                <v-text-field prepend-inner-icon="mdi-email-outline" variant="filled" label="Email" hide-details
                    class="tw-bg-neutral-200 rounded-lg" type="email" v-model="email" />
                <v-text-field prepend-inner-icon="mdi-lock-outline" variant="filled" label="Mot de passe" hide-details
                    class="tw-bg-neutral-200 rounded-lg" type="password" v-model="password" />
                <v-alert v-if="isErrorMessageDisplayed" color="error">Combinaison impossible</v-alert>
            </div>
            <div class="tw-flex tw-items-center">
                <v-checkbox hide-details label="Se souvenir de moi" />
                <password-forgot-form>
                    <template #button>
                        <p class="tw-text-primary hover:tw-underline hover:tw-text-primary-darken-1">Mot de passe oublié ?
                        </p>
                    </template>
                </password-forgot-form>
            </div>
            <div class="tw-flex tw-flex-col tw-items-center">
                <v-btn @click="handleLogin()" text="Se connecter" :disabled="isSent" block class="tw-normal-case" />
                <div class="tw-text-sm pt-4">
                    Pas encore membre?
                    <router-link :to="{ name: 'register' }"
                        class="tw-text-primary hover:tw-underline hover:tw-text-primary-darken-1" @click="dialog = false">
                        se créer un compte
                    </router-link>
                </div>
            </div>
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue";
import PasswordForgotForm from "@/components/modal/form/session/password-forgot-form.vue";
import { useScreenSize } from "@/stores/screen-size";
import { storeToRefs } from "pinia";
import { useUserStore } from "@/stores/user";

const email = ref("");
const password = ref("");
const isSent = ref(false);
const isErrorMessageDisplayed = ref(false);
const screenSize = useScreenSize();
const { isSizeLG } = storeToRefs(screenSize);
const userStore = useUserStore();
const { signin } = userStore;

const handleLogin = async () => {
    isSent.value = true;
    isErrorMessageDisplayed.value = false;
    try {
        await signin({
            email: email.value,
            password: password.value,
        })
    } catch (error) {
        throw error;
    }
    // const res = await fetch("http://localhost:3000/signin", {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //         email: email.value,
    //         password: password.value,
    //     }),
    // });
    // res.json().then((data) => {
    //     isSent.value = false;
    //     if (data.access_token) {
    //         document.cookie = `access_token=${data.access_token};max-age=3600`;
    //         dialog.value = false;
    //     } else {
    //         isErrorMessageDisplayed.value = true;
    //     }
    // });
}

const dialog = ref(false)
</script>

<style scoped></style>