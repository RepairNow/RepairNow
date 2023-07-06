import { defineStore } from "pinia";
import { Ref, ref } from "vue";
import announcementService from "@/services/api/announcement";
import { CreateEstimate, EstimateI, UpdateEstimate } from "@/interfaces/estimate";
import {ca} from "vuetify/locale";

export const useEstimateStore = defineStore("estimate", () => {
    const { _getAnnouncementEstimates, _getAnnouncementEstimate, _createAnnouncementEstimate, _updateAnnouncementEstimate, _deleteAnnouncementEstimate, _acceptAnnouncementEstimate, _checkAnnouncementEstimateStatus } = announcementService;

    const estimates: Ref<EstimateI[]> = ref([]);
    // @ts-ignore
    const estimate: Ref<EstimateI> = ref({});

    async function getAnnouncementEstimates(announcementId: string) {
        try {
            const res = await _getAnnouncementEstimates(announcementId);
            estimates.value = res;
        } catch (error) {
            throw error;
        }
    }

    async function getAnnouncementEstimate(payload: { estimateId: string, announcementId: string }) {
        try {
            const res = await _getAnnouncementEstimate(payload);
            estimate.value = res;
        } catch (error) {
            throw error;
        }
    }

    async function createAnnouncementEstimate(announcementId: string, payload: CreateEstimate) {
        try {
            const res = await _createAnnouncementEstimate(announcementId, payload);
            estimates.value.push(res);
        } catch (error) {
            throw error;
        }
    }

    async function updateAnnouncementEstimate(payload: UpdateEstimate) {
        try {
            const res = await _updateAnnouncementEstimate(payload);
            const estimateIdToUpdateIndex = estimates.value.findIndex(e => e.id === res.id);
            estimates.value.splice(estimateIdToUpdateIndex, 1, res);
        } catch (error) {
            throw error;
        }
    }

    async function deleteAnnouncementEstimate(payload: { estimateId: string, announcementId: string }) {
        try {
            const res = await _deleteAnnouncementEstimate(payload);
            const estimateIdToDeleteIndex = estimates.value.findIndex(e => e.id === payload.estimateId);
            estimates.value.splice(estimateIdToDeleteIndex, 1);
        } catch (error) {
            throw error;
        }
    }

    async function acceptAnnouncementEstimate(payload: { estimateId: string, announcementId: string}) {
        try {
            const res = await _acceptAnnouncementEstimate(payload);

            if (res.checkoutPageUrl) window.location.href = res.checkoutPageUrl
        } catch (error) {
            throw error;
        }
    }

    async function checkAnnouncementEstimateStatus(payload: {estimateId: string, announcementId: string}) {
        try {
            const res = await _checkAnnouncementEstimateStatus(payload);
            estimate.value = res
        } catch (error) {
            console.error(error);
        }
    }

    return { estimates, estimate, getAnnouncementEstimates, getAnnouncementEstimate, createAnnouncementEstimate, updateAnnouncementEstimate, deleteAnnouncementEstimate, acceptAnnouncementEstimate, checkAnnouncementEstimateStatus };
});
