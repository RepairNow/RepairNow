<template>
    <div class="tw-m-5">
        <div class="tw-font-bold tw-text-2xl">
            Mes demandes
        </div>
        <div class="tw-flex tw-gap-2">
            <v-btn
                class="tw-rounded-full tw-bg-red-100"
            >
                En cours
            </v-btn>
            <v-btn
                class="tw-rounded-full"
            >
                Terminées
            </v-btn>
        </div>
        <div
            v-if="services"
            class="tw-flex tw-flex-col tw-gap-4 tw-my-4"
        >
            <div
                v-for="i in 10"
                class="tw-p-3 border"
            >
                <div>
                    Titre
                </div>
                <div>
                    Détail
                </div>
                <div>
                    Accepter
                </div>
                <div>
                    Refuser
                </div>
            </div>
        </div>
        <div v-else>
            <p>Aucune demande en cours</p>
            <p>Faites une demande de service et trouvez un prestataire en quelques minutes</p>
            <services-modal>
                <template #button>
                    <v-btn>
                        Demander un service
                    </v-btn>
                </template>
            </services-modal>
        </div>
    </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import ServicesModal from "@/components/modal/services/services-modal.vue";

const services = ref(true)
</script>

<style scoped>

</style>