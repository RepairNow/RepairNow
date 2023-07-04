import { client } from "..";

const namespace = "/jobs";

// This class contain everything related to jobs
class Job {
	async _getJobs(): Promise<
		{
			title: string;
			id: string;
		}[]
	> {
		try {
			const res = await client.get(namespace);
			return res.data;
		} catch (err) {
			throw err;
		}
	}

	async _getJobByTitle(jobTitle: string): Promise<{
		title: string;
		id: string;
	}> {
		try {
			const uri = `${namespace}/title/${jobTitle}`;
			const res = await client.get(uri);
			return res.data;
		} catch (err) {
			throw err;
		}
	}
}

const jobService = new Job();

export default jobService;
