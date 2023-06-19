<template>
    <v-dialog
            v-model="dialog"
            transition="dialog-bottom-transition"
            :fullscreen="isSizeLG"
    >
        <template v-slot:activator="{ props }">
            <div
                    v-bind="props"
                    :class="dialogClass"
            >
                <slot name="button">
                    <v-btn
                            color="primary"
                    >
                        Inscription
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
                <p class="tw-text-3xl tw-font-bold">Créer un compte</p>
                <p>Profitez de votre temps libre grâce à nos jobbers</p>
            </div>
            <div class="tw-flex tw-flex-col tw-gap-4">
                <v-text-field
                        prepend-inner-icon="mdi-account"
                        variant="filled"
                        label="Prénom"
                        hide-details
                        class="tw-bg-neutral-200 rounded-lg"
                />
                <v-text-field
                        prepend-inner-icon="mdi-lock-outline"
                        variant="filled"
                        label="Nom"
                        hide-details
                        class="tw-bg-neutral-200 rounded-lg"

                />
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
            <div class="tw-flex tw-flex-col">
                <v-checkbox
                        hide-details
                        label="Je souhaite être informé des nouveautés, cadeaux et bons plans"
                />
                <v-checkbox
                        hide-details
                        label="Je souhaite recevoir les bons plans des partenaires"
                />
            </div>
            <div class="tw-flex tw-flex-col tw-items-center">
                <v-btn text="Se connecter" block class="tw-normal-case"/>
                <div class="tw-text-sm pt-4">
                    En vous inscrivant vous acceptez les conditions générales et la politique de confidentialité
                </div>
            </div>
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {useScreenSize} from "@/stores/screen-size";
import {storeToRefs} from "pinia";

const screenSize = useScreenSize();
const { isSizeLG } = storeToRefs(screenSize);

const props = defineProps({
    dialogClass: {type: String}
})


const dialog = ref(false)
</script>

<style scoped>

</style>