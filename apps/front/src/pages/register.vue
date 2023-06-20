<template>
	<div
		id="registerPage"
		class="tw-gap-2 tw-flex-col tw-flex tw-justify-center tw-w-full tw-p-5 tw-align-center">
		<h1 class="tw-text-xl tw-text-center tw-w-full tw-font-bold">
			Créer un compte
		</h1>
		<form class="tw-p-5" @submit.prevent="login">
			<v-text-field
				label="Adresse email"
				class="tw-secondary-darken-1"
				v-model="email"
				type="email"
				required />
			<div class="tw-flex tw-gap-4">
				<v-text-field
					label="Nom"
					class="tw-secondary-darken-1"
					v-model="lastname"
					required />
				<v-text-field
					label="Prénom"
					class="tw-secondary-darken-1"
					v-model="firstname"
					required />
			</div>
			<v-text-field
				label="Numéro de téléphone"
				type="phone"
				class="tw-secondary-darken-1"
				v-model="phone" />
			<v-text-field
				label="Mot de passe"
				type="password"
				class="tw-secondary-darken-1"
				required
				v-model="password" />
			<v-btn
				type="submit"
				color="primary"
				class="tw-w-full"
				:disabled="isSent"
				@click="handleClickLogin">
				<template v-if="isSent">
					<v-progress-circular indeterminate :size="20" />
				</template>
				<template v-else> Créer mon compte </template>
			</v-btn>
			<div class="tw-mt-5 tw-text-center">
				<router-link to="/login">
					Déjà un compte?
					<span class="primary-color">Connexion</span>
				</router-link>
			</div>
			<v-alert
				v-if="errorMessage"
				v-model="errorMessage"
				color="error"
				class="tw-mt-5"
				>{{ errorMessage }}</v-alert
			>
		</form>
	</div>
</template>

<script setup lang="ts">
import router from "@/router";
import { ref } from "vue";
const email = ref("");
const lastname = ref("");
const firstname = ref("");
const phone = ref("");
const password = ref("");
const errorMessage = ref("");
const isSent = ref(false);

const login = () => {
	isSent.value = true;
	// TODO: remove this when the backend is ready
	if (email.value === "admin" && password.value === "password") {
		router.push("/");
	} else {
		errorMessage.value =
			"Une erreur est survenue. Veuillez réessayer avec d'autres identifiants.";
	}
	// use setTimeout to simulate the time it takes to send the request
	setTimeout(() => {
		isSent.value = false;
	}, 1000);
};
</script>

<style scoped>
#registerPage {
	min-height: calc(100vh - 64px);
}

form {
	min-height: 500px;
	min-width: 300px;
	max-width: 600px;
	width: 100%;
	margin: 0 auto;
}

.primary-color {
	color: #4d908e;
}
</style>
