<template>
    <v-dialog
            v-model="dialog"
            transition="dialog-bottom-transition"
            :fullscreen="isSizeLG"
    >
        <template v-slot:activator="{ props }">
            <div
                v-bind="props"
            >
                <slot name="button">
                    <v-btn
                            color="primary"
                    >
                        Connexion
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
            <div class="mb-4">
                <p class="tw-text-3xl tw-font-bold">Content de te revoir!</p>
                <p>Connectez-vous à votre compte</p>
            </div>
            <div class="tw-flex tw-flex-col">
                <p class="tw-text-center tw-text-red-500 tw-pb-2">{{formError}}</p>
                <v-text-field
                    v-model="loginForm.email"
                    prepend-inner-icon="mdi-email-outline"
                    variant="filled"
                    label="Email"
                    :rules="[rules.required, rules.email]"
                    class="rounded-lg"
                />
                <v-text-field
                    v-model="loginForm.password"
                    prepend-inner-icon="mdi-lock-outline"
                    variant="filled"
                    label="Mot de passe"
                    :rules="[rules.required]"
                    class="rounded-lg"
                />
            </div>
            <div class="tw-flex tw-items-center">
                <v-checkbox
                    hide-details
                    label="Se souvenir de moi"
                />
                <password-forgot-form>
                    <template #button>
                        <p class="tw-text-primary hover:tw-underline hover:tw-text-primary-darken-1">Mot de passe oublié ?</p>
                    </template>
                </password-forgot-form>
            </div>
            <div class="tw-flex tw-flex-col tw-items-center">
                <v-btn text="Se connecter" block class="tw-normal-case" @click="submit()"/>
                <div class="tw-text-sm pt-4">
                    Pas encore membre?
                    <router-link
                            :to="{name: 'register'}"
                            class="tw-text-primary hover:tw-underline hover:tw-text-primary-darken-1"
                            @click="dialog = false"
                    >
                        se créer un compte
                    </router-link>
                </div>
            </div>
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
    import {ref} from "vue";
    import PasswordForgotForm from "@/components/modal/form/session/password-forgot-form.vue";
    import {useScreenSize} from "@/stores/screen-size";
    import {storeToRefs} from "pinia";
    import {useUserStore} from "@/stores/user";
    import {Signin} from "@/interfaces/user";

    const screenSize = useScreenSize();
    const { isSizeLG } = storeToRefs(screenSize);
    const { signin } = useUserStore();

    const loginForm = ref<Signin>({
        email: "",
        password: "",
    })

    const formError = ref<string>('')

    const submit = async () => {
        if (checkForm() && checkIsEmail()) {
            formError.value = ''

            await signin(loginForm)
            router.push({name: 'client-announcements'})
        } else {
            formError.value = 'Tous les champs doivent être complété'
        }
    }

    const checkForm = () => {
        return Object.values(loginForm.value).every(value => !!value);
    }

    const checkIsEmail = () => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return pattern.test(loginForm.value.email);
    }

    const rules = ref({
        required: value => !!value || 'Ce champs est requis.',
        email: value => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(value) || 'Email invalide.'
        },
    })

    const dialog = ref(false)
</script>