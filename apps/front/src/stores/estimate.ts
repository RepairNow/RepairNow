import { defineStore } from "pinia";
import { Ref, ref } from "vue";
import announcementService from "@/services/api/announcement";
import { CreateEstimate, EstimateI, UpdateEstimate } from "@/interfaces/estimate";

export const useEstimateStore = defineStore("estimate", () => {
    const { _getEstimates, _getEstimate, _createEstimate, _updateEstimate, _deleteEstimate } = announcementService;

    const estimates: Ref<EstimateI[]> = ref([]);
    // @ts-ignore
    const estimate: Ref<EstimateI> = ref({});

    async function getEstimates(announcementId: string) {
        try {
            const res = await _getEstimates(announcementId);
            estimates.value = res;
        } catch (error) {
            throw error;
        }
    }

    async function getEstimate(payload: { estimateId: string, announcementId: string }) {
        try {
            const res = await _getEstimate(payload);
            estimate.value = res;
        } catch (error) {
            throw error;
        }
    }

    async function createEstimate(payload: CreateEstimate) {
        try {
            const res = await _createEstimate(payload);
            estimates.value.push(res);
        } catch (error) {
            throw error;
        }
    }

    async function updateEstimate(payload: UpdateEstimate) {
        try {
            const res = await _updateEstimate(payload);
            const estimateIdToUpdateIndex = estimates.value.findIndex(e => e.id === res.id);
            estimates.value.splice(estimateIdToUpdateIndex, 1, res);
        } catch (error) {
            throw error;
        }
    }

    async function deleteEstimate(payload: { estimateId: string, announcementId: string }) {
        try {
            const res = await _deleteEstimate(payload);
            const estimateIdToDeleteIndex = estimates.value.findIndex(e => e.id === payload.estimateId);
            estimates.value.splice(estimateIdToDeleteIndex, 1);
        } catch (error) {
            throw error;
        }
    }

    return { estimates, estimate, getEstimates, getEstimate, createEstimate, updateEstimate, deleteEstimate };
});
