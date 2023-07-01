<template class="tw-h-screen">
	<v-progress-linear v-model="progressBarValue" color="primary" :height="8" />
	<div class="tw-flex tw-justify-center">
		<div class="tw-w-96 tw-mt-14 tw-relative">
			<h1 class="tw-font-semibold tw-text-lg tw-mb-5">
				{{ getCurrentJob($route.query.job as string)?.name }}
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
							docState = 2;
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
					<Transition name="bounce">
						<p v-if="isDatePickerError" style="text-align: center">
							On ne peut pas retourner dans le passé!
							<br />
							<span class="tw-text-red-600 tw-font-bold"
								>Choisis une autre date</span
							>
						</p>
					</Transition>
				</div>
				<div id="where" v-else-if="docState === 2" class="slidingCard">
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
					v-else-if="docState === 3"
					class="slidingCard">
					<h2 class="tw-font-bold tw-text-4xl">
						Décrivez nous en détail votre besoin
					</h2>
					<small
						>Plus vous nous donnez des détails et plus vous pourrez
						espérer une réponse de qualité de la part de nos
						prestataires 🤫</small
					>
					<v-text-field
						label="Titre utilisé pour l'annonce"
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
						!formValues.date) ||
					(docState === 1 && isDatePickerError) ||
					(docState === 2 && !(formValues.address.length > 5)) ||
					(docState === 3 &&
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
import { reactive } from "vue";
import { onMounted } from "vue";
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

const MAX_DOC_STATE_VALUE = 3;

const { query } = useRoute();
const router = useRouter();

// TODO: Use jobs from backend
const jobs = [
	{
		link: "plomberie",
		name: "Plomberie",
	},
	{
		link: "electricite",
		name: "Electricité",
	},
	{
		link: "bricolage",
		name: "Bricolage",
	},
	{
		link: "serrurier",
		name: "Serrurier",
	},
	{
		link: "electromenager",
		name: "Electromenager",
	},
	{
		link: "jardinage",
		name: "Jardinage",
	},
	{
		link: "reparation-2-roues",
		name: "Réparation 2 roues",
	},
	{
		link: "reparation-auto",
		name: "Réparation auto",
	},
];

const getCurrentJob = (job: string) => {
	const currentJob = jobs.find((j) => j.link === job);
	return currentJob;
};

const progressBarValue = ref(10);
const datePicker = ref();
const isDatePickerError = ref(false);

/* used for sliding cards */
const docState = ref(0);
const previousDocState = ref();

/* reactive form values */
const formValues = reactive({
	urgency: false,
	address: "",
	date: "",
	title: "",
	description: "",
});

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
	}
	previousDocState.value = "right";
	docState.value -= 1;
};

const handleSendFormValues = () => {
	console.log(formValues);
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
		formValues.date = val[0].toLocaleDateString();
	}
});

watch(docState, (val) => {
	if (val === 0) {
		progressBarValue.value = 10;
	} else if (val === 1) {
		progressBarValue.value = 50;
	} else if (val === 2) {
		progressBarValue.value = 75;
	} else if (val === 3) {
		progressBarValue.value = 100;
	}
});

onMounted(() => {
	// if query.job is not in jobs, redirect to home
	if (!jobs.map((job) => job.link).includes(query.job as string)) {
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
</script>

<style scoped>
.slidingCard {
	position: absolute;
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
