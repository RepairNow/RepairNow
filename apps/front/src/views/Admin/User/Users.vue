<template>
    <div class="tw-m-5">
        <div class="tw-font-bold tw-text-2xl lg:tw-text-4xl">
            Les utilisateurs
        </div>
        <div>
            {{ users }}
        </div>
    </div>
</template>

<script setup lang="ts">
import {useUserStore} from "@/stores/user";
import {onMounted} from "vue";
import {storeToRefs} from "pinia";

const userStore = useUserStore()
const { getUsers } = userStore
const { users } = storeToRefs(userStore)

onMounted(async () => {
    await getUsers()
})
</script>

<style scoped>

</style>