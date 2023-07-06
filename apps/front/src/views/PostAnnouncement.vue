<template>
	<v-progress-linear v-model="progressBarValue" color="primary" :height="8" />
	<div class="tw-flex tw-justify-center">
		<div class="tw-w-full tw-max-w-xl tw-mt-14 tw-relative">
			<h1 class="tw-font-semibold tw-text-lg tw-mb-5 tw-px-2">
				{{ getCurrentJob(query.job as string)?.title }}
			</h1>
			<Transition
				:name="
					previousDocState === 'left' ? 'slide-left' : 'slide-right'
				">
				<div id="urgency" v-if="docState === 0" class="slidingCard">
					<h2 class="tw-font-bold tw-text-4xl">
						Est-ce une urgence?
					</h2>
					<v-btn
						color="primary"
						variant="outlined"
						@click="
							formValues.urgency = true;
							docState = 3;
							previousDocState = 'left';
						"
						class="tw-w-full tw-mt-8 tw-mb-4">
						Oui ça presse 🛠️</v-btn
					>
					<v-divider
						class="tw-border-black tw-w-16 tw-m-auto"></v-divider>
					<v-btn
						color="primary"
						variant="outlined"
						@click="
							formValues.urgency = false;
							docState++;
							previousDocState = 'left';
						"
						class="tw-w-full tw-mt-4">
						Non je peux prendre RDV 📅</v-btn
					>
				</div>
				<div
					id="date"
					v-else-if="docState === 1 && !formValues.urgency"
					class="slidingCard">
					<h2 class="tw-font-bold tw-text-4xl">
						Quel jour convient le mieux?
					</h2>
					<v-date-picker
						title="Choisis un jour"
						:header="new Date().toLocaleDateString()"
						expand-icon=""
						keyboard-icon=""
						rounded
						hide-actions
						class="tw-my-5 tw-mx-auto"
						v-model="datePicker" />
					<div class="tw-h-36">
						<Transition name="bounce">
							<p
								v-if="isDatePickerError"
								style="text-align: center">
								On ne peut pas retourner dans le passé!
								<br />
								<span class="tw-text-red-600 tw-font-bold"
									>Choisis une autre date</span
								>
							</p>
						</Transition>
					</div>
				</div>
				<div
					id="hour"
					v-else-if="docState === 2 && !formValues.urgency"
					class="slidingCard">
					<h2 class="tw-font-bold tw-text-4xl">
						Quelle heure convient le mieux?
					</h2>
					<div
						class="tw-mt-12 tw-flex tw-justify-center tw-flex-wrap tw-gap-1">
						<span
							v-for="hour in HOURS"
							@click="
								formValues.preferredHour = hour;
								docState++;
								previousDocState = 'left';
							"
							:class="
								formValues.preferredHour === hour &&
								'tw-border-black'
							"
							class="tw-border-solid tw-border-2 tw-py-1 tw-px-2 tw-rounded-full tw-cursor-pointer hover:tw-bg-slate-200"
							>{{ hour }}</span
						>
						<span
							@click="
								formValues.preferredHour = 'peu importe';
								docState++;
								previousDocState = 'left';
							"
							:class="
								formValues.preferredHour === 'peu importe' &&
								'tw-border-black'
							"
							class="tw-border-solid tw-border-2 tw-py-1 tw-px-2 tw-rounded-full tw-cursor-pointer hover:tw-bg-slate-200"
							>Peu importe</span
						>
					</div>
				</div>
				<div id="when" v-else-if="docState === 3" class="slidingCard">
					<h2 class="tw-font-bold tw-text-4xl tw-mb-6">
						En combien d'heures estimez vous la prestation?
					</h2>
					<div class="tw-flex tw-gap-2">
						<div
							@click="
								formValues.estimatedTime = 2;
								docState++;
								previousDocState = 'left';
							"
							:class="
								formValues.estimatedTime === 2 &&
								' tw-border-black'
							"
							class="tw-h-44 tw-rounded tw-boder-solid tw-border-2 tw-flex-1 tw-cursor-pointer tw-items-center tw-justify-center tw-flex hover:tw-bg-slate-200">
							<span
								class="tw-font-bold tw-text-2xl tw-flex tw-items-center"
								>2H<v-icon>mdi-clock-time-two</v-icon>
							</span>
						</div>
						<div
							@click="
								formValues.estimatedTime = 4;
								docState++;
								previousDocState = 'left';
							"
							:class="
								formValues.estimatedTime === 4 &&
								' tw-border-black'
							"
							class="tw-relative tw-h-44 tw-rounded tw-boder-solid tw-border-2 tw-flex-1 tw-cursor-pointer tw-items-center tw-justify-center tw-flex hover:tw-bg-slate-200">
							<span
								class="tw-font-bold tw-text-2xl tw-flex tw-items-center tw-relative">
								4H
								<v-icon>mdi-clock-time-four</v-icon>
							</span>
							<span
								class="tw-absolute tw-bottom-1 tw-font-normal tw-text-sm tw-bg-yellow-500 tw-rounded-full tw-px-2 tw-py-1 tw-flex tw-items-center tw-gap-1">
								<v-icon :size="18">mdi-star-circle</v-icon>
								Populaire</span
							>
						</div>
						<div
							@click="
								formValues.estimatedTime = 6;
								docState++;
								previousDocState = 'left';
							"
							:class="
								formValues.estimatedTime === 6 &&
								' tw-border-black'
							"
							class="tw-h-44 tw-rounded tw-boder-solid tw-border-2 tw-flex-1 tw-cursor-pointer tw-items-center tw-justify-center tw-flex hover:tw-bg-slate-200">
							<span
								class="tw-font-bold tw-text-2xl tw-flex tw-items-center"
								>6H<v-icon>mdi-clock-time-six</v-icon>
							</span>
						</div>
					</div>
					<div class="tw-flex tw-my-12 tw-items-center">
						<v-divider class="tw-w-full tw-border-black" />
						<span class="tw-mx-4">OU</span>
						<v-divider class="tw-w-full tw-border-black" />
					</div>
					<div
						class="tw-mx-auto tw-border-2 tw-shadow tw-border-solid tw-rounded tw-w-fit tw-p-4 tw-flex tw-items-center">
						<v-icon
							color="primary"
							:size="36"
							:class="
								formValues.estimatedTime === 1
									? 'tw-opacity-50 tw-cursor-not-allowed'
									: 'tw-cursor-pointer'
							"
							@click="
								if (formValues.estimatedTime > 1)
									formValues.estimatedTime--;
							"
							>mdi-minus-circle</v-icon
						>
						<span class="tw-text-2xl tw-mx-4 tw-font-bold">
							{{ formValues.estimatedTime }}H
						</span>
						<v-icon
							color="primary"
							:size="36"
							class="tw-cursor-pointer"
							@click="formValues.estimatedTime++"
							>mdi-plus-circle</v-icon
						>
					</div>
				</div>
				<div id="where" v-else-if="docState === 4" class="slidingCard">
					<h2 class="tw-font-bold tw-text-4xl">
						Quelle est l'adresse de la prestation?
					</h2>
					<small
						>Veuillez être précis: numéro de rue, rue, code postal
						et ville</small
					>
					<v-text-field
						label="Adresse"
						class="tw-w-full tw-mt-8"
						v-model="formValues.address" />
				</div>
				<div
					id="moreInfos"
					v-else-if="docState === 5"
					class="slidingCard tw-pb-24">
					<h2 class="tw-font-bold tw-text-4xl">
						Décrivez nous en détail votre besoin
					</h2>
					<small
						>Plus vous nous donnez des détails et plus vous pourrez
						espérer une réponse de qualité de la part de nos
						prestataires 🤫</small
					>
					<v-text-field
						label="Titre de la demande"
						class="tw-w-full tw-mt-8"
						:counter="50"
						flat
						:rules="rulesTitleInput"
						v-model="formValues.title" />
					<v-textarea
						id="desc"
						label="Décrivez nous votre besoin"
						class="tw-w-full tw-mt-8"
						:counter="255"
						:rules="rulesDescriptionInput"
						v-model="formValues.description" />
					<small class="tw-text-center tw-w-full tw-inline-block"
						>Une demande illustrée à 7 fois plus de chance d'être
						vue 💡</small
					>
					<!-- TODO: add rules to v-file-input to limit size of documents see https://vuetifyjs.com/en/components/file-inputs/#validation -->
					<v-file-input
						v-if="!previewUrl"
						accept="image/png, image/jpeg, image/jpg"
						show-size
						counter
						multiple
						:rules="rulesFileInput"
						class="tw-mt-2"
						v-model="selectedFile"
						label="Dépose ici une photo (optionnel)"
						@change="handleFileChange" />

					<div class="tw-relative tw-w-fit tw-mx-auto tw-mt-2" v-else>
						<v-img :src="previewUrl" width="120" />
						<v-btn
							icon="mdi-close"
							color="none"
							class="tw-absolute tw-top-0 tw-right-0"
							@click="removeFile" />
					</div>
				</div>
			</Transition>
		</div>
		<footer
			class="tw-fixed tw-w-full tw-bg-white tw-bottom-0 tw-h-20 tw-flex tw-justify-evenly tw-items-center tw-border-t-2">
			<v-btn
				color="primary"
				variant="plain"
				@click="docState === 0 ? router.go(-1) : handleClickPrev()">
				Précédent</v-btn
			>
			<v-btn
				color="primary"
				@click="
					docState === MAX_DOC_STATE_VALUE
						? handleSendFormValues()
						: handleClickNext()
				"
				:disabled="
					docState === 0 ||
					(!formValues.urgency &&
						docState === 1 &&
						!formValues.startTime) ||
					(docState === 1 && isDatePickerError) ||
					(docState === 4 && !(formValues.address.length > 5)) ||
					(docState === 5 &&
						!(
							formValues.title.length > 5 &&
							formValues.title.length < 50 &&
							formValues.description.length > 5 &&
							formValues.description.length < 255
						))
				">
				{{
					docState === MAX_DOC_STATE_VALUE ? "Envoyer" : "Suivant"
				}}</v-btn
			>
		</footer>
	</div>
</template>

<script lang="ts" setup>
import { CreateAnnouncement } from "@/interfaces/announcement";
import { useAnnouncementStore } from "@/stores/announcement";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import { reactive } from "vue";
import { onMounted } from "vue";
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import annoucementService from "@/services/api/announcement";
import jobService from "@/services/api/job";

const MAX_DOC_STATE_VALUE = 5;
// constant HOURS from 7H00 to 21H00 with 30 minutes interval
const HOURS = Array.from(
	{ length: 29 },
	(_, i) => `${Math.floor(i / 2) + 7}H${i % 2 === 0 ? "00" : "30"}`
);

const { _uploadAnnouncementImages } = annoucementService;
const { createAnnouncement } = useAnnouncementStore();

const { query } = useRoute();
const router = useRouter();

const getCurrentJob = (job: string) => {
	const currentJob = jobsFromBackend?.value?.find((j: any) => j.id === job);
	return currentJob;
};

const progressBarValue = ref(10);
const datePicker = ref();
const isDatePickerError = ref(false);

/* used for sliding cards */
const docState = ref(0);
const previousDocState = ref();

/* reactive form values */
const formValues = reactive<CreateAnnouncement>({
	urgency: false,
	title: "",
	description: "",
	address: "",
	startTime: new Date(),
	estimatedTime: 4,
	preferredHour: "peu importe",
	jobId: query.job as string,
});

const handleSendFormValues = async () => {
	try {
		const annoucementCreated = await createAnnounPostAnnouncementcement(formValues);

		formData.append("id", annoucementCreated.id);

        if (selectedFile.value) {
            await _uploadAnnouncementImages(formData);
        }
		if (annoucementCreated.id) {
			await router.push({ name: "client-announcements" });
		}
	} catch (e) {
		console.log("error when creating announcement", e);
	}
};

const handleClickNext = () => {
	if (docState.value === MAX_DOC_STATE_VALUE) {
		return;
	}
	previousDocState.value = "left";
	docState.value += 1;
};

const handleClickPrev = () => {
	if (docState.value === 0) {
		return;
	} else if (docState.value === 2 && formValues.urgency) {
		docState.value -= 1;
		previousDocState.value = "right";
	} else if (docState.value === 3 && formValues.urgency) {
		docState.value -= 2;
		previousDocState.value = "right";
	}
	previousDocState.value = "right";
	docState.value -= 1;
};

const date = new Date();
watch(datePicker, (val) => {
	// if val is inferior to today, set it to today
	if (
		val[0] < date &&
		val[0].toLocaleDateString() !== date.toLocaleDateString()
	) {
		isDatePickerError.value = true;
	} else {
		isDatePickerError.value = false;
		formValues.startTime = val[0];
	}
});

watch(docState, (val) => {
	if (val === 0) {
		progressBarValue.value = 10;
	} else if (val === 1) {
		progressBarValue.value = 30;
	} else if (val === 2) {
		progressBarValue.value = 50;
	} else if (val === 3) {
		progressBarValue.value = 70;
	} else if (val === 4) {
		progressBarValue.value = 85;
	} else if (val === 5) {
		progressBarValue.value = 100;
	}
});

const userStore = useUserStore();
const { currentUser } = storeToRefs(userStore);

const { _getJobs } = jobService;
const jobsFromBackend = ref();

onMounted(async () => {
	if (!currentUser.value) {
		router.push({ name: "register" });
	}

	jobsFromBackend.value = await _getJobs();

	// if query.job is not in jobs, redirect to home
	if (
		!jobsFromBackend.value
			.map((job: any) => job.id)
			.includes(query.job as string)
	) {
		router.push({ name: "home-page" });
	}
});

const rulesTitleInput = [
	(v: string) => !!v || "Le titre est requis",
	(v: string) =>
		v.length <= 50 || "Le titre doit faire moins de 50 caractères",
];

const rulesDescriptionInput = [
	(v: string) => !!v || "Pas de détails = pas d'aide 😵",
	(v: string) =>
		v.length <= 255 || "La description doit faire moins de 255 caractères",
];

// TODO: Validation de taille de fichier
const rulesFileInput = [
    (v: any) => v.size < 10 || "La photo ne doit pas dépasser 1Mo",
];

/** File input Part */
const selectedFile = ref();
const previewUrl = ref();
let formData = new FormData();
const handleFileChange = (event: any) => {
	const files = event.target.files;
	if (files) {
		for (const file of files) {
			const reader = new FileReader();
			reader.onload = (e) => {
				previewUrl.value = e.target?.result;
			};
			reader.readAsDataURL(file);
			formData.append("files", file);
		}
	} else {
		previewUrl.value = null;
	}
};
const removeFile = () => {
	previewUrl.value = null;
	selectedFile.value = null;
	formData.delete("files");
};
</script>

<style scoped>
.slidingCard {
	position: absolute;
	width: inherit;
	padding: 0 8px;
}
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
	transition: all 0.25s ease-out;
}
.slide-right-enter-from {
	opacity: 0;
	transform: translateX(-30px);
}
.slide-right-leave-to {
	opacity: 0;
	transform: translateX(30px);
}
.slide-left-enter-from {
	opacity: 0;
	transform: translateX(30px);
}
.slide-left-leave-to {
	opacity: 0;
	transform: translateX(-30px);
}

/* Style below is used for error picker */
.bounce-enter-active {
	animation: bounce-in 0.5s;
}
.bounce-leave-active {
	animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
	0% {
		transform: scale(0);
	}
	50% {
		transform: scale(1.25);
	}
	100% {
		transform: scale(1);
	}
}
</style>
