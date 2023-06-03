<template>
	<div
		id="loginPage"
		class="tw-gap-2 tw-flex-col tw-flex tw-justify-center tw-w-full tw-p-5 tw-align-center">
		<h1 class="tw-text-xl tw-text-center tw-w-full tw-font-bold">
			Connectez vous pour accéder à votre compte
		</h1>
		<div
			class="tw-flex tw-p-5 tw-justify-center tw-gap-10"
			id="wrapperLoginAndImg">
			<img src="src/assets/svg/login.svg" alt="login svg" id="imgLogin" />
			<form @submit.prevent="login" id="formLogin">
				<v-text-field
					label="Adresse email"
					class="tw-secondary-darken-1"
					v-model="email"
					type="email"
					required />
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
					:disabled="isSent">
					<template v-if="isSent">
						<v-progress-circular indeterminate :size="20" />
					</template>
					<template v-else> Connexion </template>
				</v-btn>
				<div class="tw-mt-5 tw-flex tw-justify-between">
					<router-link to="/register"> S'inscrire </router-link>
					<v-dialog v-model="isDialogOpened" width="auto">
						<template v-slot:activator="{ props }">
							<router-link to="#" v-bind="props">
								Mot de passe oublié
							</router-link>
						</template>

						<v-card class="tw-p-5">
							<img
								src="src/assets/svg/forgot-password.svg"
								alt="login svg"
								id="imgForgotPassword" />
							<h2
								class="tw-text-xl tw-text-center tw-w-full tw-font-bold">
								Saisissez votre adresse email
							</h2>
							<small class="tw-text-center">
								Si l'adresse email est valide, un email vous
								sera envoyé.
							</small>
							<form
								@submit.prevent="handleForgotPassword"
								class="tw-mt-5">
								<v-text-field
									label="Adresse email"
									class="tw-secondary-darken-1"
									v-model="emailForgotPassword"
									type="email"
									required />
								<v-btn
									type="submit"
									color="primary"
									class="tw-w-full"
									:disabled="isForgotPasswordSent"
									@click="handleClickForgotPassword">
									<template v-if="isForgotPasswordSent">
										<v-progress-circular
											indeterminate
											:size="20" />
									</template>
									<template v-else> Envoyer </template>
								</v-btn>
							</form>
						</v-card>
					</v-dialog>
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
	</div>
</template>

<script setup>
import router from "@/router";
import { ref } from "vue";
const email = ref("");
const password = ref("");
const errorMessage = ref("");
const isSent = ref(false);
const isDialogOpened = ref(false);
const emailForgotPassword = ref("");
const isForgotPasswordSent = ref(false);

const login = () => {
	isSent.value = true;
	// TODO: remove this when the backend is ready
	if (email.value === "admin@gmail.com" && password.value === "password") {
		router.push("/");
	} else {
		errorMessage.value = "Nom d'utilisateur ou mot de passe incorrect.";
	}
	// use setTimeout to simulate the time it takes to send the request
	setTimeout(() => {
		isSent.value = false;
	}, 1000);
};

const handleForgotPassword = () => {
	console.log("send email to reset password", emailForgotPassword.value);
	isForgotPasswordSent.value = true;

	setTimeout(() => {
		isForgotPasswordSent.value = false;
		isDialogOpened.value = false;
	}, 1000);
};
</script>

<style scoped>
#loginPage {
	min-height: calc(100vh - 64px);
}

#imgLogin {
	width: 450px;
	height: 300px;
}

#imgForgotPassword {
	width: 300px;
	height: 240px;
}

#wrapperLoginAndImg {
	min-height: 400px;
}

#formLogin {
	margin-top: 50px;
}

form {
	width: 300px;
}

@media (max-width: 900px) {
	#imgLogin {
		display: none;
	}

	form {
		max-width: 420px;
		width: 100%;
	}
}
</style>
