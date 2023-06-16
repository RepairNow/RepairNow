<template>
    <v-card>
        <v-layout>
            <v-navigation-drawer
                    image="https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg"
                    permanent
                    theme="dark"
            >
                <v-list nav>
                    <v-list-item
                        v-for="item in items"
                        :prepend-icon="item.icon"
                        :title="item.title"
                        :value="item.value"
                    />
                </v-list>
            </v-navigation-drawer>
        </v-layout>
    </v-card>
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