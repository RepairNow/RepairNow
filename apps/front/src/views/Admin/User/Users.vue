<template>
	<div class="tw-m-5 tw-font-bold tw-text-2xl lg:tw-text-4xl">
		Les utilisateurs
	</div>
	<div class="tw-flex tw-gap-4 tw-items-center tw-mb-2 tw-px-5">
		<v-btn color="primary">
			Nouveau
			<v-dialog v-model="isDialogOpen" activator="parent" width="auto">
				<v-card>
					<div class="tw-p-5" id="dialogCreate">
						<h2 class="tw-mb-4">Créer un utilisateur</h2>
						<v-text-field
							v-model="newUserData.email"
							label="Email"
							outlined />
						<v-text-field
							v-model="newUserData.firstname"
							label="Prénom"
							outlined />
						<v-text-field
							v-model="newUserData.lastname"
							label="Nom"
							outlined />
						<v-radio-group
							label="Rôle de l'utilisateur"
							v-model="newUserData.role">
							<v-radio label="Admin" value="admin" />
							<v-radio label="Prestataire" value="contractor" />
							<v-radio label="Client" value="client" />
						</v-radio-group>
						<v-btn
							color="primary"
							block
							@click="handleSubmitNewUser()"
							:disabled="isButtonNewUserSubmittes"
							>Créer</v-btn
						>
					</div>
				</v-card>
			</v-dialog>
		</v-btn>
		<v-text-field
			v-model="filter"
			label="Rechercher"
			variant="outlined"
			hide-details
			density="compact">
			<template #prepend-inner>
				<FontAwesomeIcon icon="fa-solid fa-search"></FontAwesomeIcon>
			</template>
		</v-text-field>
	</div>
	<div class="tw-flex-grow-1 tw-mb-10">
		<div class="tw-table-container">
			<table class="tw-min-w-full">
				<thead class="tw-bg-white tw-border-b">
					<tr>
						<th
							scope="col"
							class="tw-text-sm tw-font-medium tw-text-gray-900 tw-px-6 tw-py-2 tw-text-left">
							Email
						</th>
						<th
							scope="col"
							class="tw-text-sm tw-font-medium tw-text-gray-900 tw-px-6 tw-py-2 tw-text-left">
							Nom/Prénom
						</th>
						<th
							scope="col"
							class="tw-text-sm tw-font-medium tw-text-gray-900 tw-px-6 tw-py-2 tw-text-left">
							Numéro de téléphone
						</th>
						<th
							scope="col"
							class="tw-text-sm tw-font-medium tw-text-gray-900 tw-px-6 tw-py-2 tw-text-left">
							Rôle
						</th>
					</tr>
				</thead>
				<tbody>
					<tr
						v-for="(user, index) of users"
						:key="`${user.email}-${index}`"
						class="hover:tw-bg-gray-200 tw-bg-gray-100 tw-border-b tw-cursor-pointer"
						@click.stop="handleClickOnAUser((user as any).id)">
						<td
							class="tw-text-sm tw-text-gray-900 tw-font-light tw-px-6 tw-py-2 tw-whitespace-nowrap">
							{{ user.email }}
							{{ (user as any).isEmailVerified ? "✅" : "❌" }}
						</td>
						<td
							class="tw-text-sm tw-text-gray-900 tw-font-medium tw-px-6 tw-py-2 tw-whitespace-nowrap">
							{{ user.firstname }} {{ user.lastname }}
						</td>
						<td
							class="tw-text-sm tw-text-gray-900 tw-font-light tw-px-6 tw-py-2 tw-whitespace-nowrap">
							{{ (user as any).phoneNumber }}
							{{ (user as any).isPhoneVerified ? "✅" : "❌" }}
						</td>
						<td class="text-sm text-gray-900 font-light px-6 py-2">
							{{ parseRole(user.role) }}
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { useRouter } from "vue-router";
import { createToast } from "mosha-vue-toastify";

const router = useRouter();
const userStore = useUserStore();
const { getUsers } = userStore;
const { users } = storeToRefs(userStore);

const isDialogOpen = ref<boolean>(false);
const filter = ref<string>("");

onMounted(async () => {
	try {
		await getUsers();
	} catch {}
});

const newUserData = ref({
	role: "consultant",
	email: "",
	firstname: "",
	lastname: "",
});

const isButtonNewUserSubmittes = ref(false);

const handleSubmitNewUser = async () => {
	console.log("new user");
};

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

const handleClickOnAUser = (userId: string) => {
	router.push({ name: "admin-user", params: { id: userId } });
};
</script>

<style scoped>
#dialogCreate {
	width: 420px;
}

.table-container {
	width: 100%;
	height: 100%;
	overflow-y: auto;
}

table {
	width: 100%;
	border-collapse: collapse;
}

thead {
	position: sticky;
	top: 0;
	background-color: #fff;
}
</style>
