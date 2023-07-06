import { defineStore } from "pinia";
import { Ref, ref } from "vue";
import { MissionI } from "@/interfaces/mission";
import validationCodeService from "@/services/api/validation-code";
import {ValidationCodeI} from "@/interfaces/validation_code";

export const useValidationCodeStore = defineStore("validation-code", () => {
    const { _getValidationCode, _validateCode, _contractorConfirmation } = validationCodeService;

    // @ts-ignore
    const validationCode: Ref<ValidationCodeI> = ref({});

    async function getValidationCode(missionId: string) {
        try {
            const res = await _getValidationCode(missionId);
            validationCode.value = res;
        } catch (error) {
            throw error;
        }
    }

    async function validateCode(missionId: string, code: number) {
        try {
            const res = await _validateCode(missionId, code);
            validationCode.value = res;
        } catch (error) {
            throw error;
        }
    }

    async function contractorConfirmation(missionId: string) {
        try {
            const res = await _contractorConfirmation(missionId);
            validationCode.value = res;
        } catch (error) {
            throw error;
        }
    }

    return { validationCode, getValidationCode, validateCode, contractorConfirmation };
});
