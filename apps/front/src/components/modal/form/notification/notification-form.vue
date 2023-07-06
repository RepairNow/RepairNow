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
                    <v-btn color="primary">
                        Nouvelle notification
                    </v-btn>
                </slot>
            </div>
        </template>

        <v-card class="tw-w-1/3 tw-mx-auto tw-p-4 rounded-lg">
            <div class="tw-flex">
                <v-spacer />
                <v-btn icon="mdi-close" color="none" @click="dialog = false" />
            </div>
            <div class="mb-4">
                <p class="tw-text-3xl tw-font-bold">Générer un nouvelle notification</p>
            </div>
            <div class="tw-flex tw-flex-col">
                <p class="tw-text-center tw-text-red-500 tw-pb-2">{{formError}}</p>
                <v-text-field
                        v-model="notificationForm.title"
                        prepend-inner-icon="mdi-format-title"
                        variant="filled"
                        label="Titre"
                        :rules="[rules.required]"
                        class="rounded-lg"
                />
                <v-text-field
                        v-model="notificationForm.content"
                        prepend-inner-icon="mdi-text"
                        variant="filled"
                        label="Description"
                        class="rounded-lg"
                />
            </div>
            <div class="tw-flex tw-flex-col tw-items-center">
                <v-btn @click="sendNotificationViaSocket()" text="Envoyer" :disabled="isSent" block class="tw-normal-case" />
            </div>
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { SendNotification } from "@/interfaces/notification";
import { useNotificationStore } from "@/stores/notifications";
import { io } from "socket.io-client";
import { token } from "@/services";

const { sendNotification } = useNotificationStore();
const router = useRouter()

const socket = io(import.meta.env.VITE_BACKENDCOM_URL, {
	auth: {
		token: token.value,
	},
});

const notificationForm = ref<SendNotification>({
    title: "",
    content: "",
})

onMounted(() => {
	socket.on("response_notification", (data) => {
		console.log(data);
	});
});

const sendNotificationViaSocket = () => {
    socket.emit("create_notification", {
        title: notificationForm.value.title,
        content: notificationForm.value.content
    });
};

const isSent = ref<boolean>(false);
const formError = ref<string>('')
const isErrorMessageDisplayed = ref<boolean>(false);

const handleNotification = async () => {
    if (checkForm()) {
        isSent.value = true;
        isErrorMessageDisplayed.value = false;
        try {
            await sendNotification(notificationForm.value)
            formError.value = ''
        } catch (error) {
            isErrorMessageDisplayed.value = true;
            throw error;
        }
    } else {
        formError.value = 'Certains champs sont manquants ou invalides.'
    }
}

const checkForm = () => {
    return Object.values(notificationForm.value).every(value => !!value);
}

const rules = ref({
    required: (value: string) => !!value || 'Ce champs est requis.',
})

const dialog = ref(false)
</script>

<style scoped></style>
