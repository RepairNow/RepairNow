import axios, { AxiosInstance } from "axios";
import { useStorage } from "@vueuse/core";
import { computed } from "vue";
export const token = useStorage('token', '');
export const refreshToken = useStorage('refreshToken', '');

const config = computed(() => {
    return {
        baseURL: import.meta.env.VITE_BACKEND_URL,
        headers: {
            "Content-Type": "application/json",
        }
    }
});

const client: AxiosInstance = axios.create(config.value);

const clientWithoutAuth: AxiosInstance = axios.create(config.value);

client.interceptors.request.use(function (config: any) {
    config.headers.Authorization = `Bearer ${token.value ? token.value : ''}`;
    return config;
});

export { client, clientWithoutAuth };