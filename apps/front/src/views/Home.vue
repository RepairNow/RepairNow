<template>
    <div class="tw-px-8 md:tw-px-32 lg:tw-px-64 tw-mt-6">
        <div class="lg:tw-h-[800px] tw-bg-[url('/undraw_friendship_mni7.svg')] tw-bg-right tw-bg-contain tw-flex tw-flex-col tw-py-48">
            <div class="2xl:tw-w-1/2 xl:tw-w-2/3 tw-w-full">
                <h1 class="tw-text-3xl lg:tw-text-5xl tw-font-bold">
                    Trouvez le prestataire idéal pour tous les services du quotidien
                </h1>
                <announcements-modal>
                    <template #button>
                        <v-btn
                                class="tw-normal-case tw-rounded-full tw-justify-start tw-my-6 tw-border"
                                color="white"
                                height="80"
                        >
                            <template #default>
                                <span class="tw-w-full tw-pl-4 tw-text-lg">Obtenir un réparateur</span>
                            </template>

                            <template #append>
                                <div class="tw-bg-primary tw-p-3 tw-rounded-full">
                                    <v-icon
                                            size="35"
                                            class="tw-text-white"
                                    >
                                        mdi-magnify
                                    </v-icon>
                                </div>
                            </template>
                        </v-btn>
                    </template>
                </announcements-modal>
            </div>
        </div>
        <div class="tw-flex tw-py-10 tw-border-b-2 overflow-auto tw-gap-4">
            <div v-for="item in items"
                class="tw-w-full tw-text-center tw-flex tw-items-center tw-justify-center  tw-gap-2"
            >
                <v-icon class="tw-text-primary">
                    {{ item.icon }}
                </v-icon>
                {{ item.title }}
            </div>
        </div>
        <div class="tw-py-10">
            <div class="2xl:tw-w-1/2 xl:tw-w-2/3 tw-w-full ">
                <h2 class="tw-text-2xl tw-font-bold">De quel service avez-vous besoin ?</h2>
                <p class="tw-text-neutral-500">Pour chaque situation, trouvez le prestataire dont les compétences répondent à vos attentes et à votre niveau d’exigence.</p>
            </div>
            <div class="tw-grid tw-grid-cols-1 md:tw-grid-cols-3 tw-gap-3 tw-py-2">
                <div v-for="i in 9" class="">
                    <div class="tw-py-20 tw-border tw-rounded-lg" />
                    <p class="tw-py-1">
                        {{ i }}
                    </p>
                </div>
            </div>
        </div>
        <div class="tw-py-10">
            <div class="2xl:tw-w-1/2 xl:tw-w-2/3 tw-w-full ">
                <h2 class="tw-text-2xl tw-font-bold">Découvrez nos services du moment ?</h2>
            </div>
            <div class="tw-flex tw-gap-3 tw-py-2 overflow-auto">
                <div v-for="i in 9" class="">
                    <div class="tw-py-20 tw-w-96 tw-border tw-rounded-lg" />
                    <p class="tw-py-1">
                        {{ i }}
                    </p>
                </div>
            </div>
            <v-btn
                    class="tw-flex tw-items-center tw-normal-case"
                    variant="text"
                    text="Voir tous les services"
                    append-icon="mdi-chevron-right"
            />
        </div>
        <div class="tw-py-10">
            <div class="2xl:tw-w-1/2 xl:tw-w-2/3 tw-w-full">
                <h2 class="tw-text-2xl tw-font-bold">Le service à domicile en toute sérénité</h2>
            </div>
            <div class="tw-flex tw-flex-col md:tw-flex-row tw-py-10 overflow-auto tw-gap-4">
                <div v-for="item in items"
                     class="tw-w-full tw-flex tw-gap-2 tw-flex-col"
                >
                    <v-icon class="tw-text-primary" size="30">
                        {{ item.icon }}
                    </v-icon>
                    <h3 class="tw-font-bold tw-text-lg">{{ item.title }}</h3>
                    <p class="tw-text-neutral-500">{{ item.description }}</p>

                </div>
            </div>
        </div>

        <div class="tw-px-16 tw-py-12 tw-border tw-rounded-lg tw-mb-8">
            <div class="lg:tw-w-1/2 ">
                <h2 class="tw-font-bold tw-text-2xl">Spécialiste du service</h2>
                <p class="tw-text-neutral-500">Tentez l’expérience et faites nous confiance comme plus de 645 000 clients qui aujourd’hui profitent de leur temps libre.</p>
            </div>
            <div class="tw-flex tw-flex-col lg:tw-flex-row tw-pt-10 tw-gap-6">
                <div class="tw-w-full lg:tw-w-1/3 tw-flex tw-gap-3">
                    <div class="tw-flex tw-items-center">
                        <v-icon
                            icon="mdi-briefcase-variant-outline"
                            class="tw-p-8 tw-rounded-full tw-text-white tw-bg-primary"
                            size="35"
                        />
                    </div>
                    <div class="tw-flex tw-flex-col tw-justify-center">
                        <p class="tw-text-2xl">1 620 000</p>
                        <p class="tw-text-md tw-text-neutral-500">Services réalisés</p>
                    </div>
                </div>
                <div class="tw-w-full lg:tw-w-1/3 tw-flex tw-gap-3">
                    <div class="tw-flex tw-items-center">
                        <v-icon
                            icon="mdi-account-outline"
                            class="tw-p-8 tw-rounded-full tw-text-white tw-bg-secondary"
                            size="35"
                        />
                    </div>
                    <div class="tw-flex tw-flex-col tw-justify-center">
                        <p class="tw-text-2xl">45 000</p>
                        <p class="tw-text-md tw-text-neutral-500">Prestataires actifs</p>
                    </div>
                </div>
                <div class="tw-w-full lg:tw-w-1/3 tw-flex tw-gap-3">
                    <div class="tw-flex tw-items-center">
                        <v-icon
                            icon="mdi-star-outline"
                            class="tw-p-8 tw-rounded-full tw-bg-primary-darken-1 tw-text-white"
                            size="35"
                        />
                    </div>
                    <div class="tw-flex tw-flex-col tw-justify-center">
                        <p class="tw-text-2xl">4,9/5</p>
                        <p class="tw-text-md tw-text-neutral-500">Note moyenne des prestataires</p>
                    </div>
                </div>
            </div>
        </div>

        <div>

        </div>
    </div>
</template>

<script setup lang="ts">
    import {ref} from "vue";
    import AnnouncementsModal from "@/components/modal/form/announcements/announcements-modal.vue";

    const items = ref([
        {
            title: "Prestataires qualifiés",
            icon: "mdi-account-check-outline",
            description: "Tous les prestataires sont vérifiés, suivis et évalués pour chaque service rendu afin de vous garantir le meilleur niveau de satisfaction."
        },
        {
            title: "Prestataires assurées",
            icon: "mdi-shield-check-outline",
            description: "Toutes les prestations sont couvertes par notre assurance AXA, qu’il s’agisse de dommages corporels ou matériels occasionnés chez vous, sans franchise."
        },
        {
            title: "Budget respecté",
            icon: "mdi-wallet",
            description: "Tous les prix sont définis à l’avance, les prestataires s’engagent à les respecter. Toutes les rémunérations sont déclenchées en ligne après votre accord."
        },
        {
            title: "Service encadré",
            icon: "mdi-phone-outline",
            description: "Notre service client est à votre disposition 7j/7 pour vous assurer une expérience parfaite de la prise de commande jusqu'à la fin de la prestation."
        }
    ])

    const tuto = ref([
        {
            icon: '',
            title: 'Demandez un service',
            description: 'Remplissez le formulaire et obtenez une estimation du prix et de la durée',
        },
        {
            icon: '',
            title: 'Réservez votre prestataire',
            description: 'Des prestataires compétents et proches de chez vous vous proposent leurs services',
        },
        {
            icon: '',
            title: 'Souriez, c\'est fait !',
            description: 'Votre prestataire vous rend service au prix et à la date convenus',
        },

    ])
</script>
