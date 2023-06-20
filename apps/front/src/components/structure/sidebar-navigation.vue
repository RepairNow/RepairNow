<template>
    <div class="tw-h-full tw-bg-white tw-border-r sm:tw-flex tw-hidden tw-w-full">
        <slot name="content">
            <v-list
                nav
                class="tw-bg-white tw-w-full"
            >
                <v-list-item
                        v-for="item in items"
                        :value="item.value"
                        class="tw-flex tw-items-center"
                        :to="{name: item.to}"
                >
                    <v-icon color="primary" class="tw-mr-2">{{item.icon}}</v-icon>
                    {{item.title}}
                </v-list-item>
            </v-list>
        </slot>
    </div>
</template>

<script setup lang="ts">

const props = defineProps({
    items: {
        type: Array,
        required: true,
    }
})
</script>

<style scoped>

</style>