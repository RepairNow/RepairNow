import { Signin, Signup, UserI } from "@/interfaces/user";
import { defineStore } from "pinia";
import { Ref, ref } from "vue";
import { token } from "@/services";
import userService from "@/services/api/user";

export const useUserStore = defineStore("user", () => {
    const { _signin, _signup, _getSelfUser } = userService;
    const user: Ref<UserI | null> = ref(null);

    async function signin(payload: Signin) {
        try {
            const res = await _signin(payload);
            user.value = res.user;
            token.value = res.access_token;
            // await getSelf();
        } catch (error) {
            throw error;
        }
    }

    async function signup(payload: Signup) {
        try {
            await _signup(payload);
        } catch (error) {
            throw error;
        }
    }

    async function getSelf() {
        try {
            const res = await _getSelfUser();
            user.value = res;
        } catch (error) {
            throw error;
        }
    }

    return { user, signin, getSelf, signup };
});
