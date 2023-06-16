<template>
    <div class="tw-h-full tw-bg-white tw-border-r sm:tw-flex tw-hidden tw-w-full">
        <v-list
            nav
            class="tw-bg-white tw-w-full"
        >
            <v-list-item
                    v-for="item in items"
                    :value="item.value"
                    class="tw-flex tw-items-center"
            >
                <v-icon color="primary" class="tw-mr-2">{{item.icon}}</v-icon>
                {{item.title}}
            </v-list-item>
        </v-list>
    </div>
</template>

<script setup>

const props = defineProps({
    items: {
        type: Array ,
        required: true,
    }
})
</script>

<style scoped>

</style>