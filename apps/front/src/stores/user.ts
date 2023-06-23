import {ResetPassword, Signin, Signup, UserI} from "@/interfaces/user";
import { defineStore } from "pinia";
import { Ref, ref } from "vue";
import { token } from "@/services";
import userService from "@/services/api/user";

export const useUserStore = defineStore("user", () => {
    const { _signin, _signup, _getSelfUser, _resetPassword, _getUsers } = userService;
    // @ts-ignore
    const user: Ref<UserI | null> = ref(null);
    const users: Ref<UserI[]> = ref([]);

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

    async function resetPassword(payload: ResetPassword) {
        try {
            await _resetPassword(payload);
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

    async function getUsers() {
        try {
            const res = await _getUsers();
            users.value = res;
        } catch (error) {
            throw error;
        }
    }

    return { user, users, signin, getSelf, signup, resetPassword, getUsers };
});
