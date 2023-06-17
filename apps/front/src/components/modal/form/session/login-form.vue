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
            <div class="tw-flex tw-flex-col tw-gap-4">
                <v-text-field
                    prepend-inner-icon="mdi-email-outline"
                    variant="filled"
                    label="Email"
                    hide-details
                    class="tw-bg-neutral-200 rounded-lg"
                />
                <v-text-field
                    prepend-inner-icon="mdi-lock-outline"
                    variant="filled"
                    label="Mot de passe"
                    hide-details
                    class="tw-bg-neutral-200 rounded-lg"

                />
            </div>
            <div class="tw-flex tw-items-center">
                <v-checkbox
                    hide-details
                    label="Se souvenir de moi"
                />
                <router-link
                        to=""
                >
                    <p class="tw-text-primary hover:tw-underline hover:tw-text-primary-darken-1">Mot de passe oublié ?</p>
                </router-link>
            </div>
            <div class="tw-flex tw-flex-col tw-items-center">
                <v-btn text="Se connecter" block class="tw-normal-case"/>
                <div class="tw-text-sm pt-4">
                    Pas encore membre?
                    <router-link
                            to="register"
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

    const dialog = ref(false)
</script>

<style scoped>

</style>