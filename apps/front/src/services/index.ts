import axios, { AxiosInstance } from "axios";
import { useStorage } from "@vueuse/core";
import { computed } from "vue";
import router from "@/router";
export const token = useStorage('access_token', '');
export const refreshToken = useStorage('refreshToken', '');

const config = computed(() => {
    return {
        baseURL: import.meta.env.VITE_BACKEND_URL,
        headers: {
            "Content-Type": "application/json",
        }
    }
});

const configFormData = computed(() => {
    return {
        baseURL: import.meta.env.VITE_BACKEND_URL,
        headers: {
            "Content-Type": "multipart/form-data",
        }
    }
});

const client: AxiosInstance = axios.create(config.value);

const clientWithoutAuth: AxiosInstance = axios.create(config.value);

const clientFormData: AxiosInstance = axios.create(configFormData.value);

client.interceptors.request.use(
    function (config: any) {
        config.headers.Authorization = `Bearer ${token.value ? token.value : ''}`;
        return config;
    },
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            if (refreshToken.value) {
                try {
                    // Send a request to your server to refresh the access token
                    const response = await axios.post('/refresh_tokens',
                        { headers:
                            {
                                Authorization: `Bearer ${refreshToken.value ? refreshToken.value : ''}`
                            }
                        }
                    );

                    // Update the access token in local storage
                    token.value = response.data.accessToken
                    refreshToken.value = response.data.accessToken

                    // Retry the original request with the new access token
                    originalRequest.headers['Authorization'] = `Bearer ${token.value}`;
                    return axios(originalRequest);
                } catch (refreshError) {
                    console.error('Failed to refresh token:', refreshError);

                    await router.push({name: 'home'});
                }
            } else {
                console.error('Refresh token not found');

                await router.push({name: 'home'});
            }
        }

        return Promise.reject(error);
    }
);

clientFormData.interceptors.request.use(
    function (config: any) {
        config.headers.Authorization = `Bearer ${token.value ? token.value : ''}`;
        return config;
    },
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            if (refreshToken.value) {
                try {
                    // Send a request to your server to refresh the access token
                    const response = await axios.post('/refresh_tokens',
                        { headers:
                            {
                                Authorization: `Bearer ${refreshToken.value ? refreshToken.value : ''}`
                            }
                        }
                    );

                    // Update the access token in local storage
                    token.value = response.data.accessToken
                    refreshToken.value = response.data.accessToken

                    // Retry the original request with the new access token
                    originalRequest.headers['Authorization'] = `Bearer ${token.value}`;
                    return axios(originalRequest);
                } catch (refreshError) {
                    console.error('Failed to refresh token:', refreshError);

                    await router.push({name: 'home'});
                }
            } else {
                console.error('Refresh token not found');

                await router.push({name: 'home'});
            }
        }

        return Promise.reject(error);
    }
);

export { client, clientWithoutAuth, clientFormData };