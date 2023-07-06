<template>
    <div class="tw-absolute tw-w-full tw-bottom-0 tw-left-0 tw-h-14 tw-bg-white tw-items-center px-2 tw-flex lg:tw-hidden tw-z-[1000]">
        <slot name="content">
            <router-link
                    v-for="item in (items as any[])"
                    :style="`width: calc(100% / ${items?.length})`"
                    class="tw-text-xs tw-truncate tw-flex tw-flex-col tw-items-center hover:tw-bg-primary/20 tw-h-full tw-justify-center"
                    color="none"
                    stacked
                    :to="{name: item.to}"
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
        </slot>
    </div>
</template>

<script setup lang="ts">
import {ref} from "vue";

const props = defineProps({
    items: { type: Array }
})

const value = ref(false);

</script>

<style scoped>

</style>