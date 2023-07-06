<template>
    <div>
      <v-snackbar
        elevation="24"
        v-model="snackbar"
      >
        {{ text }}
  
        <template v-slot:actions>
          <v-btn
            color="white"
            variant="text"
            @click="snackbar = false"
          >
            Fermer
          </v-btn>
        </template>
      </v-snackbar>
    </div>
</template>

<script setup lang="ts">
import { token } from '@/services';
import { io } from 'socket.io-client';
import { onMounted, ref } from 'vue';

const snackbar = ref(false);
const text = ref('Hello, world!');

const socket = io(import.meta.env.VITE_BACKENDCOM_URL, {
    auth: {
        token: token.value,
    },
});

onMounted(() => {
	socket.on("response_notification", (data) => {
		console.log(data);
        const { title, content } = data;
        text.value = `${title.toUpperCase()} : ${content}`;
        snackbar.value = true;
	});
});
</script>

<style scoped>

</style>
