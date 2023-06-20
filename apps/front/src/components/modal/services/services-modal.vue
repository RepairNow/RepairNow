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
                        Obtenir un réparateur
                    </v-btn>
                </slot>
            </div>


        </template>

        <v-card class="tw-w-2/3 tw-mx-auto tw-p-4 rounded-lg">
            <div class="tw-flex">
                <v-btn
                        v-if="service"
                        icon="mdi-chevron-left"
                        color="none"
                        @click="service = null"
                />
                <v-spacer/>
                <v-btn
                        icon="mdi-close"
                        color="none"
                        @click="dialog = false"

                />
            </div>
            <div class="mb-4">
                <p
                    v-if="!service"
                    class="tw-text-3xl tw-font-bold tw-flex tw-items-center tw-h-16"
                >
                    Demander un service
                </p>
                <p
                    v-else
                    class="tw-text-3xl tw-font-bold tw-flex tw-items-center tw-h-16"
                >
                    <span
                        class="tw-text-primary hover:tw-underline tw-cursor-pointer"
                        @click="service = null"
                    >Demander un service</span>
                    <v-icon>mdi-chevron-right</v-icon>
                    {{service}}
                </p>
            </div>
            <div class="tw-flex tw-flex-col tw-gap-4 tw-mb-4">
                <v-text-field
                        prepend-inner-icon="mdi-magnify"
                        variant="filled"
                        label="Rechercher un service..."
                        hide-details
                        class="tw-bg-neutral-200 "
                />
            </div>
            <div
                v-if="!service"
                class="tw-grid tw-grid-cols-2 tw-gap-4 overflow-auto"
            >
                <div
                    v-for="i in 20"
                    class="border w-94 tw-rounded-lg tw-p-3 tw-flex tw-items-center"
                    @click="service = i"
                >
                    <div
                        class="tw-h-16 tw-w-16 rounded-lg tw-mr-4"
                    >

                    </div>
                    {{i}}
                    <v-spacer />
                    <v-icon>mdi-chevron-right</v-icon>
                </div>
            </div>
            <div
                v-else
                class="tw-flex tw-flex-col tw-gap-4 overflow-auto"
            >
                <div
                    v-for="i in 20"
                    class="border w-94 tw-rounded-lg tw-p-3 tw-flex tw-items-center"
                >
                    <div
                        class="tw-h-16 tw-w-16 rounded-lg tw-mr-4"
                    >

                    </div>
                    {{i}}
                    <v-spacer />
                    <v-icon>mdi-chevron-right</v-icon>
                </div>
            </div>
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
import {ref} from "vue";

const dialog = ref(false)

const service = ref(null)
</script>

<style scoped>

</style>