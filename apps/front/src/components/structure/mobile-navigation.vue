<template>
    <div class="tw-absolute tw-w-full tw-bottom-0 tw-left-0 tw-flex tw-h-14 tw-bg-white tw-items-center px-2 tw-flex sm:tw-hidden">
        <router-link
            v-for="item in items"
            :style="`width: calc(100% / ${items.length})`"
            class="tw-text-xs tw-truncate tw-flex tw-flex-col tw-items-center hover:tw-bg-primary/20 tw-h-full tw-justify-center"
            color="none"
            stacked
            :to="{}"
        >
            <v-icon
                    color="primary"
            >
                {{ item.icon }}
            </v-icon>
            <span>
                {{ item.title }}
            </span>
        </router-link>
    </div>
</template>

<script setup>
import {ref} from "vue";

const props = defineProps({
    items: { type: Array }
})

const value = ref(false);

</script>

<style scoped>

</style>