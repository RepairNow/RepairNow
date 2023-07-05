<template>
	<v-dialog
		v-model="dialog"
		transition="dialog-bottom-transition"
		:fullscreen="isSizeMD">
		<template v-slot:activator="{ props }">
			<div v-bind="props">
				<slot name="button">
					<v-btn class="tw-absolute tw-bottom-20 tw-right-10 lg:tw-relative lg:tw-bottom-0"> Suivre ma mission - En cours </v-btn>
				</slot>
			</div>
		</template>

		<v-card class="tw-w-2/3 tw-mx-auto tw-p-4 rounded-lg">
			<div class="tw-flex">
				<v-btn icon="mdi-close" color="none" @click="dialog = false" />
			</div>
			<div>
                Suivre ma mission
            </div>
            <div>
                Valider la fin de ma mission
            </div>
		</v-card>
	</v-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useScreenSize } from "@/stores/screen-size";
import { storeToRefs } from "pinia";
import repairImg from "@/assets/svg/jobs/repair.png";
import electricityImg from "@/assets/svg/jobs/electricity.svg";
import gardenImg from "@/assets/svg/jobs/garden.svg";
import bikeImg from "@/assets/svg/jobs/bike-repair.svg";
import plumbingImg from "@/assets/svg/jobs/plumbing.svg";
import carImg from "@/assets/svg/jobs/car-repair.svg";
import locksmithImg from "@/assets/svg/jobs/locksmith.svg";
import houseApplianceImg from "@/assets/svg/jobs/house-appliance.png";
import { useRouter } from "vue-router";

const items = [
	{
		text: "Bricolage",
		job: "bricolage",
		image: repairImg,
	},
	{
		text: "Electricité",
		job: "electricite",
		image: electricityImg,
	},
	{
		text: "Plomberie",
		job: "plomberie",
		image: plumbingImg,
	},
	{
		text: "Serrurier",
		job: "serrurier",
		image: locksmithImg,
	},
	{
		text: "Electroménager",
		job: "electromenager",
		image: houseApplianceImg,
	},
	{
		text: "Jardinage",
		job: "jardinage",
		image: gardenImg,
	},
	{
		text: "Réparation 2 roues (vélo, moto, scooter)",
		job: "reparation-2-roues",
		image: bikeImg,
	},
	{
		text: "Réparation voiture",
		job: "reparation-auto",
		image: carImg,
	},
];

const dialog = ref(false);
const screenSizeStore = useScreenSize();
const { isSizeMD } = storeToRefs(screenSizeStore);

const router = useRouter();

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
