<template>
	<div class="file-upload">
		<v-label>{{ label }}</v-label>
		<div
			class="drop-area tw-w-8 tw-absolute tw-right-0 tw-bottom-0 tw-bg-black tw-text-white tw-cursor-pointer"
			@dragover.prevent
			@click="$refs.upload.click()">
			<input
				ref="upload"
				type="file"
				@change="handleInput"
				v-show="false"
				accept="image/png, image/jpeg, image/jpg" />
			<div class="content-wrapper text-center">
				<v-icon icon="mdi-pencil" :size="26" />
			</div>
		</div>

		<VMessages :value="errorBucket" color="error" />
	</div>
</template>

<script>
import { VInput } from "vuetify/lib/components/VInput/VInput.mjs";
export default {
	name: "FileUpload",
	extends: VInput,
};
</script>

<style scoped>
.file-upload {
	margin-top: 5px;
}
.drop-area {
	width: 20px;
	padding: 2px;
	cursor: pointer;
	border: 1px lightgray dashed;
	display: block;
	border-radius: 50%;
}
</style>
