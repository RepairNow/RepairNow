<template>
	<div class="tw-p-5 tw-flex tw-flex-col">
		<h1 class="tw-my tw-font-bold tw-text-2xl lg:tw-text-4xl">
			Fiche utilisateur : {{ user?.lastname }} {{ user?.firstname }}
		</h1>
		<span class="tw-mt-5">
			<span class="tw-font-bold">Role:</span>
			{{ parseRole(user?.role as string) }}
			<!-- TODO: See why this fucking ref "newUserData" isnt set onMounted -->
			<v-radio-group inline color="primary" v-model="newUserData.role">
				<v-radio label="Client" value="CLIENT" />
				<v-radio label="Prestataire" value="CONTRACTOR" />
				<v-radio label="Admin" value="ADMIN" />
			</v-radio-group>
		</span>
		<span class="tw-mt-5">
			<span class="tw-font-bold">Email:</span> {{ user?.email }}
			<span class="tw-font-bold">
				{{ user?.isEmailVerified ? "(vérifié)" : "(non vérifié)" }}
			</span>
		</span>
		<span class="tw-mt-5">
			<span class="tw-font-bold">Numéro de téléphone:</span>
			{{ user?.phoneNumber }}
			<span class="tw-font-bold">
				{{ user?.isPhoneVerified ? "(vérifié)" : "(non vérifié)" }}
			</span>
		</span>
		<span class="tw-mt-5">
			<span class="tw-font-bold">Actif:</span>
			{{ !user?.isUserDeleted }}
			<v-switch
				v-model="test"
				color="primary"
				value="isUserDeleted"
				hide-details />
		</span>

		<small class="tw-mt-24">
			Crée le :
			{{ new Date(user?.createdAt as Date).toLocaleDateString() }}
		</small>
	</div>
</template>

<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { onMounted } from "vue";
import { useRoute } from "vue-router";

const test = ref(false);

const userStore = useUserStore();
const { getUserById } = userStore;
const { user } = storeToRefs(userStore);
const route = useRoute();

const newUserData = ref({
	role: user?.value?.role,
	email: user?.value?.email,
	firstname: user?.value?.firstname,
	lastname: user?.value?.lastname,
});

onMounted(async () => {
	try {
		await getUserById(route?.params?.id as string);
	} catch {}
});

const parseRole = (role: string) => {
	switch (role) {
		case "CLIENT":
			return "Client";
		case "CONTRACTOR":
			return "Prestataire";
		case "ADMIN":
			return "Administrateur";
		default:
			return "Pas de droits";
	}
};
</script>

<style scoped></style>
