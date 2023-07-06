<template>
    <div class="tw-m-5">
        <div class="tw-font-bold tw-text-2xl lg:tw-text-4xl">
            Les notifications
        </div>
        <div>
            <notification-form />
        </div>
        <v-list class="notification-list">
            <v-list-item>
                <v-list-item-content>
                <v-list-item-title>
                    Titre de la notification
                </v-list-item-title>
                <v-list-item-subtitle>
                    Sous-titre de la notification
                </v-list-item-subtitle>
                <v-list-item-subtitle>
                    Date de la notification
                </v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
        <!-- Ajoutez plus de v-list-item pour chaque notification -->
        </v-list>
    </div>
</template>

<script setup lang="ts">
import NotificationForm from "@/components/modal/form/notification/notification-form.vue";

const socket = io("http://localhost:3005", {
	auth: {
		token: token.value,
	},
});


</script>
    
<style scoped>

</style>