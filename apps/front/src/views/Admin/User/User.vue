<template>
	<div v-if="user" class="tw-p-5 tw-flex tw-flex-col">
		<h1 class="tw-my tw-font-bold tw-text-2xl lg:tw-text-4xl">
			Fiche utilisateur : {{ user?.lastname }} {{ user?.firstname }}
		</h1>
		<span class="tw-mt-5 tw-flex tw-items-center">
			<span class="tw-font-bold">Role:</span>
			<v-radio-group
				hide-details
				inline
				color="primary"
				v-model="user.role">
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
		<span class="tw-mt-5 tw-flex tw-items-center">
			<span class="tw-font-bold tw-mr-2">Utilisateur désactivé:</span>
			<v-switch
				v-model="user.isUserDeleted"
				color="primary"
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
import { ref } from "vue";
import { onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import userService from "@/services/api/user";

const { _updateUser } = userService;
const { getUserById } = useUserStore();
const route = useRoute();

const user = ref();

watch(
	user,
	(newVal: any) => {
		if (newVal) {
			const { avatar, ...rest } = newVal;
			_updateUser(rest);
		}
	},
	{ deep: true }
);

onMounted(async () => {
	try {
		user.value = await getUserById(route?.params?.id as string);
		console.log(user.value);
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
