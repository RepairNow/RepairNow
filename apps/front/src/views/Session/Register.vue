<template>
    <div class="tw-flex tw-flex-col tw-items-center tw-my-6 tw-mx-4">
        <h1 class="tw-text-2xl tw-font-bold tw-my-12">Bienvenue chez RepairNow</h1>
        <div class="tw-flex lg:tw-flex-row tw-items-center tw-gap-12 tw-flex-col">
            <div class="tw-border tw-w-full tw-rounded hover:tw-shadow-lg tw-p-6 tw-gap-y-2 tw-flex tw-flex-col lg:tw-w-96">
                <v-icon
                        icon="mdi-room-service-outline"
                        size="100"
                />
                <span class="tw-font-bold tw-text-lg">J'ai besoin d'un service</span>
                <p class="tw-text-neutral-500">Trouvez le prestataire idéal pour vos services du quotidien</p>
            </div>
            <div class="tw-flex tw-justify-center tw-text-xl tw-font-medium">
                OU
            </div>
            <router-link :to="{name: 'become-contractor'}">
                <div class="tw-border tw-w-full tw-rounded hover:tw-shadow-lg tw-p-6 tw-gap-y-2 tw-flex tw-flex-col lg:tw-w-96">
                    <v-icon
                            icon="mdi-briefcase-variant"
                            size="100"
                    />
                    <span class="tw-font-bold tw-text-lg">Devenir prestataire</span>
                    <p class="tw-text-neutral-500">Augmentez vos revenus en rendant service près de chez vous</p>
                </div>
            </router-link>
        </div>
        <div class="tw-my-6">
            <p>Vous avez déjà un compte ? Connectez-vous</p>
        </div>
    </div>
</template>

<script setup lang="ts">

</script>

