<template>
	<v-dialog
		v-model="dialog"
		transition="dialog-bottom-transition"
		:fullscreen="isSizeMD">
		<template v-slot:activator="{ props }">
			<div v-bind="props">
				<slot name="button">
					<v-btn color="primary"> Obtenir un réparateur </v-btn>
				</slot>
			</div>
		</template>

		<v-card class="tw-w-2/3 tw-mx-auto tw-p-4 rounded-lg">
			<div class="tw-flex">
				<v-btn icon="mdi-close" color="none" @click="dialog = false" />
			</div>
			<div class="mb-4">
				<p
					class="tw-text-3xl tw-font-bold tw-flex tw-items-center tw-h-16">
					Demander un service
				</p>
			</div>
			<div class="grid-container">
				<div v-for="item in items">
					<div class="grid-item" @click="handleClickItem(item.job)">
						<img width="60" :src="item.image" :alt="item.text" />
						<span>
							{{ item.text }}
						</span>
					</div>
				</div>
			</div>
		</v-card>
	</v-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useScreenSize } from "@/stores/screen-size";
import { storeToRefs } from "pinia";
import repairImg from "@/assets/svg/jobs/repair.svg";
import electricityImg from "@/assets/svg/jobs/electricity.svg";
import gardenImg from "@/assets/svg/jobs/garden.svg";
import bikeImg from "@/assets/svg/jobs/bike-repair.svg";
import plumbingImg from "@/assets/svg/jobs/plumbing.svg";
import carImg from "@/assets/svg/jobs/car-repair.svg";
import locksmithImg from "@/assets/svg/jobs/locksmith.svg";
import houseApplianceImg from "@/assets/svg/jobs/house-appliance.png";
import { useRouter } from "vue-router";
import { onMounted } from "vue";
import jobService from "@/services/api/job";

const { _getJobs } = jobService;
const jobsFromBack = ref();

const items = ref();

const dialog = ref(false);
const screenSizeStore = useScreenSize();
const { isSizeMD } = storeToRefs(screenSizeStore);

const router = useRouter();

onMounted(async () => {
	jobsFromBack.value = await _getJobs();
	items.value = [
		{
			text: jobsFromBack.value?.[0]?.title,
			job: jobsFromBack.value?.[0]?.id,
			image: repairImg,
		},
		{
			text: jobsFromBack.value?.[1]?.title,
			job: jobsFromBack.value?.[1]?.id,
			image: electricityImg,
		},
		{
			text: jobsFromBack.value?.[2]?.title,
			job: jobsFromBack.value?.[2]?.id,
			image: plumbingImg,
		},
		{
			text: jobsFromBack.value?.[3]?.title,
			job: jobsFromBack.value?.[3]?.id,
			image: locksmithImg,
		},
		{
			text: jobsFromBack.value?.[4]?.title,
			job: jobsFromBack.value?.[4]?.id,
			image: houseApplianceImg,
		},
		{
			text: jobsFromBack.value?.[5]?.title,
			job: jobsFromBack.value?.[5]?.id,
			image: gardenImg,
		},
		{
			text: jobsFromBack.value?.[6]?.title,
			job: jobsFromBack.value?.[6]?.id,
			image: bikeImg,
		},
		{
			text: jobsFromBack.value?.[7]?.title,
			job: jobsFromBack.value?.[7]?.id,
			image: carImg,
		},
	];
});

const handleClickItem = (job: string) => {
	router.push({ name: "post-announcement", query: { job } });
	dialog.value = false;
};
</script>

<style scoped>
.grid-container {
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-gap: 12px;
}

.grid-item {
	word-break: break-word;
	border-radius: 5px;
	display: flex;
	align-items: center;
	padding: 10px;
	gap: 10px;
	text-align: center;
	box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
	cursor: pointer;
	transition-property: background-color;
	transition-duration: 0.5s; /* Définir la durée souhaitée */
}
.grid-item img {
	background-color: rgb(226, 226, 226);
	border-radius: 4px;
	width: 60px;
	height: 60px;
	object-fit: cover;
	transition: transform 0.5s;
}

.grid-item:hover {
	background-color: rgb(226, 226, 226);
}
.grid-item:hover img {
	transform: scale(1.1);
	transition: transform 0.5s;
}
</style>
