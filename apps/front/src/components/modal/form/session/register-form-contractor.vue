<template>
	<v-dialog
		v-model="dialog"
		transition="dialog-bottom-transition"
		:fullscreen="isSizeLG">
		<template v-slot:activator="{ props }">
			<div v-bind="props" :class="dialogClass">
				<slot name="button">
					<v-btn color="primary"> Inscription </v-btn>
				</slot>
			</div>
		</template>

		<v-card class="tw-w-1/3 tw-mx-auto tw-p-4 rounded-lg">
			<div class="tw-flex">
				<v-spacer />
				<v-btn icon="mdi-close" color="none" @click="dialog = false" />
			</div>
			<div class="mb-4">
				<p class="tw-text-3xl tw-font-bold">Devenir prestataire</p>
				<p>
					Vous souhaitez devenir un RepairMan? Remplissez ce
					formulaire
				</p>
			</div>
			<div class="tw-flex tw-flex-col">
				<p class="tw-text-center tw-text-red-500 tw-pb-2">
					{{ formError }}
				</p>
				<v-text-field
					v-model="registerForm.firstname"
					prepend-inner-icon="mdi-account"
					variant="filled"
					label="Prénom*"
					:rules="[rules.required]"
					class="rounded-lg" />
				<v-text-field
					v-model="registerForm.lastname"
					prepend-inner-icon="mdi-account"
					variant="filled"
					label="Nom*"
					:rules="[rules.required]"
					class="rounded-lg" />
				<v-text-field
					v-model="registerForm.phoneNumber"
					prepend-inner-icon="mdi-phone-outline"
					variant="filled"
					label="Numéro de téléphone*"
					:rules="[rules.required, rules.phoneNumber]"
					class="rounded-lg"
					type="phone" />
				<v-text-field
					v-model="registerForm.email"
					prepend-inner-icon="mdi-email-outline"
					variant="filled"
					label="Email*"
					:rules="[rules.required, rules.email]"
					class="rounded-lg" />
				<v-text-field
					v-model="registerForm.password"
					prepend-inner-icon="mdi-lock-outline"
					variant="filled"
					label="Mot de passe*"
					:rules="[rules.required]"
					class="rounded-lg"
					type="password" />
			</div>
			<div class="tw-flex tw-flex-col tw-hidden">
				<v-checkbox
					hide-details
					label="Je souhaite être informé des nouveautés, cadeaux et bons plans" />
				<v-checkbox
					hide-details
					label="Je souhaite recevoir les bons plans des partenaires" />
			</div>
			<div class="tw-flex tw-flex-col tw-items-center">
				<v-btn
					text="S'inscrire"
					block
					class="tw-normal-case"
					@click="submit()" />
				<div class="tw-text-sm pt-4">
					En vous inscrivant vous acceptez les conditions générales et
					la politique de confidentialité
				</div>
			</div>
		</v-card>
	</v-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useScreenSize } from "@/stores/screen-size";
import { storeToRefs } from "pinia";
import { Signup } from "@/interfaces/user";
import { useUserStore } from "@/stores/user";
import { useRouter } from "vue-router";

const screenSize = useScreenSize();
const { isSizeLG } = storeToRefs(screenSize);
const { signup } = useUserStore();
const router = useRouter();

const props = defineProps({
	dialogClass: { type: String },
});

const registerForm = ref<Signup>({
	isContractorRoleAsked: true,
	firstname: "",
	lastname: "",
	email: "",
	password: "",
	phoneNumber: "",
});

const formError = ref<string>("");

const submit = async () => {
	if (checkForm() && checkIsEmail()) {
		formError.value = "";
		try {
			await signup(registerForm.value);
		} catch {
			formError.value = "Une erreur est survenue";
		}
	} else {
		formError.value = "Certains champs sont manquants ou invalides.";
	}
};

const checkForm = () => {
	return Object.values(registerForm.value).every((value) => !!value);
};

const checkIsEmail = () => {
	const pattern =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return pattern.test(registerForm.value.email);
};

const rules = ref({
	required: (value: string) => !!value || "Ce champs est requis.",
	email: (value: string) => {
		const pattern =
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return pattern.test(value) || "Email invalide.";
	},
	phoneNumber: (value: string) => {
		const pattern = /^\+?[0-9\s-()]{10,20}$/;
		return pattern.test(value) || "Numéro de téléphone invalide";
	},
});

const dialog = ref(false);
</script>

<style scoped></style>
