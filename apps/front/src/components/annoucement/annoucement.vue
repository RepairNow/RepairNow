<template>
    <div class="tw-flex tw-flex-col tw-p-8 tw-rounded-xl">
        <div class="tw-flex tw-flex-col lg:tw-flex-row tw-gap-4 tw-w-full">
            <div class="tw-flex tw-flex-col tw-w-full">
                <div class="tw-h-56 tw-bg-red-100 tw-rounded-xl">
                    image
                </div>
                <div class="tw-my-4">
                    Montage de meubles IKEA
                    Dimanche 26 mai 2024 à 21:00 (4h)
                </div>
            </div>
            <div class="tw-w-full">
                <div class="tw-border-y tw-p-6">
                    Vous n'avez pas réservé de prestataire
                </div>
                <div class="tw-my-3 tw-p-3 tw-border tw-rounded-xl">
                    Vous avez reçu 17 offres
                    + 14 autres offres
                </div>
            </div>
        </div>
        <div>
            <router-link :to="{name: 'client-announcement', params: { id: 1 }}">
                <v-btn
                    block
                >
                    Gérer ma demande
                </v-btn>
            </router-link>
        </div>
    </div>
</template>

<script setup>
/**
 * Prestarire reservé
 * Offre prestataire
 * Titre du services
 * Date de demande (+ durée)
 * Gérer ma demande
 */
</script>

