import { defineStore } from "pinia";
import { Ref, ref } from "vue";
import jobService from "@/services/api/job";

export const useJobStore = defineStore("job", () => {
	const { _getJobs, _getJobByTitle } = jobService;

	const jobs: Ref<
		{
			title: string;
			id: string;
		}[]
	> = ref([]);
	// @ts-ignore
	const job: Ref<{
		title: string;
		id: string;
	}> = ref({});

	async function getJobs() {
		try {
			const res = await _getJobs();
			jobs.value = res;
			return res;
		} catch (error) {
			throw error;
		}
	}

	async function getJobByTitle(jobTitle: string) {
		try {
			const res = await _getJobByTitle(jobTitle);
			job.value = res;
		} catch (error) {
			throw error;
		}
	}

	return {
		jobs,
		job,
		getJobs,
		getJobByTitle,
	};
});
