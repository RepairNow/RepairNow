import { Signin, Signup, UserI } from "@/interfaces/user";
import { defineStore } from "pinia";
import { Ref, ref } from "vue";
import userService from "@/services/api/user";

export const useUserStore = defineStore("user", () => {
    const { _signin, _signup, _getSelfUser } = userService;
    // @ts-ignore
    const user: Ref<UserI> = ref({});

    async function signin(payload: Signin) {
        try {
            await _signin(payload);
            await getSelf();
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
