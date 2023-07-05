import {ResetPassword, Signin, Signup, UserI} from "@/interfaces/user";
import { defineStore } from "pinia";
import { Ref, ref } from "vue";
import { token, refreshToken } from "@/services";
import userService from "@/services/api/user";

export const useUserStore = defineStore("user", () => {
    const { _signin, _signup, _getSelfUser, _resetPassword, _getUsers, _getUserById, _signinWithToken, _getSelfAllInfos } = userService;
    // @ts-ignore
    const currentUser: Ref<UserI | null> = ref(null);
    const currentUserAllInfos: Ref<UserI | null> = ref(null);
    const user: Ref<UserI | null> = ref(null);
    const users: Ref<UserI[]> = ref([]);

    async function signin(payload: Signin) {
        try {
            const res = await _signin(payload);
            currentUser.value = res.user;
            token.value = res.access_token;
            // refreshToken.value = res.refresh_token;
            // await getSelf();
        } catch (error) {
            throw error;
        }
    }

    async function signup(payload: Signup) {
        try {
            const res = await _signup(payload);
            currentUser.value = res.user;
            token.value = res.access_token;
        } catch (error) {
            throw error;
        }
    }

    function signout() {
        try {
            currentUser.value = null;
            token.value = ''
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
            currentUser.value = res;
        } catch (error) {
            //await _signinWithToken()
            throw error;
        }
    }
    
    async function getSelfAllInfos() {
        try {
            const res = await _getSelfAllInfos();
            currentUserAllInfos.value = res;
            return res;
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
    
    async function getUserById(userId: string) {
        try {
            const res = await _getUserById(userId);
            user.value = res;
        } catch (error) {
            throw error;
        }
    }

    function isAdmin() {
        return currentUser.value?.role === "ADMIN"
    }

    function isContractor() {
        return currentUser.value?.role === "CONTRACTOR" || currentUser.value?.role === "ADMIN"
    }

    function isClient() {
        return currentUser.value?.role === "CLIENT" || currentUser.value?.role === "CONTRACTOR" || currentUser.value?.role === "ADMIN"
    }

    function isConnected() {
        return !!token.value
    }

    return { signout, currentUser, user, users, currentUserAllInfos, signin, getSelf, signup, resetPassword, getUsers, isAdmin, isContractor, isClient, isConnected, getUserById, getSelfAllInfos };
});
