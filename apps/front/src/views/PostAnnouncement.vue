<template class="tw-h-screen">
	<v-progress-linear v-model="progressBarValue" color="primary" :height="8" />
	<div class="tw-flex tw-h-full tw-justify-center">
		<div class="tw-w-96 tw-mt-14 tw-relative">
			<!-- TODO: Replace "plomberie" by real variable -->
			<h1 class="tw-font-semibold tw-text-lg tw-mb-5">Plomberie</h1>
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
			</Transition>
		</div>
		<footer
			class="tw-fixed tw-w-full tw-bg-white tw-bottom-0 tw-h-20 tw-flex tw-justify-evenly tw-items-center tw-border-t-2">
			<v-btn
				color="primary"
				variant="plain"
				@click="handleClickPrev()"
				:disabled="docState === 0">
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
					(docState === 2 && !(formValues.address.length > 5))
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

const MAX_DOC_STATE_VALUE = 2;

const { query } = useRoute();
const router = useRouter();

const categories = ["plomberie", "electricite", "maconnerie", "menuiserie"];

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

watch(datePicker, (val) => {
	// if val is inferior to today, set it to today
	if (val[0].toLocaleDateString() < new Date().toLocaleDateString()) {
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
		progressBarValue.value = 100;
	}
});

onMounted(() => {
	// if query.category is not in categories, redirect to home
	if (!categories.includes(query.category as string)) {
		router.push({ name: "home" });
	}
});
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
