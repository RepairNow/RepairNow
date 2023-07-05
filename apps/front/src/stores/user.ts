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
    const isAdmin: Ref<boolean> = ref(false);
    const isContractor: Ref<boolean> = ref(false);
    const isClient: Ref<boolean> = ref(false);
    const isConnected: Ref<boolean> = ref(!!token.value);

    async function signin(payload: Signin) {
        try {
            const res = await _signin(payload);
            currentUser.value = res.user;
            token.value = res.access_token;
            // refreshToken.value = res.refresh_token;
            await getSelf();
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
            isClient.value = false
            isConnected.value = false
            isAdmin.value = false
            isContractor.value = false
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
            checkRole(currentUser.value.role)
        } catch (error) {
            //await _signinWithToken()
            //console.log( new Error("Unauthorized"));
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
            // user.value = res;
            return res;
        } catch (error) {
            throw error;
        }
    }

    function checkRole(role: string) {
        isAdmin.value = role === "ADMIN";
        isContractor.value = role === "CONTRACTOR" || role === "ADMIN";
        isClient.value = role === "CLIENT" || role === "CONTRACTOR" || role === "ADMIN";
        isConnected.value = !!token.value;
    }

    return { signout, currentUser, user, users, currentUserAllInfos, signin, getSelf, signup, resetPassword, getUsers, isAdmin, isContractor, isClient, isConnected, getUserById, getSelfAllInfos };
});
