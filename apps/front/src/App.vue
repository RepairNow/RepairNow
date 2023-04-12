<script lang="ts" setup>
import { ref } from "vue";

// TODO: see how we can get this NEXT_PUBLIC_API_HOST
// const API_HOST = process.env.NEXT_PUBLIC_API_HOST || "http://localhost:3001";

const API_HOST = "http://localhost:3001";

const name = ref("");
const error = ref("");
const response = ref("");

const onSubmit = async (e: any) => {
	e.preventDefault();

	try {
		const result = await fetch(`${API_HOST}/message/${name.value}`);
		const r = await result.json();
		// store response inside the "response" state
		response.value = r.message;
	} catch (err) {
		console.error(err);
	}
};

const onReset = () => {
	name.value = "";
	error.value = "";
	response.value = "";
};
</script>

<!-- This code only show you that we can communicate with API service that is a simply express app running on port 3001. -->
<template>
	<div>
		<h1>
			Example of usage service API Express with an VueJS APP inside
			MonoRepo (with docker configured too!)
		</h1>

		<form @submit="onSubmit">
			<label>Name</label>
			<input type="text" name="name" id="name" v-model="name" />
			<button type="submit">Submit</button>
		</form>

		<div v-if="error">
			<h3>Error</h3>
			<p>{error}</p>
		</div>
		<div v-if="response">
			<h3>Greeting</h3>
			<p>{{ response }}</p>
			<Button @click="onReset">Reset</Button>
		</div>
	</div>
</template>

<style scoped></style>
