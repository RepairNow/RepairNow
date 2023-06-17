import { defineStore } from "pinia";
import { Ref, ref } from "vue";
import announcementService from "@/services/api/announcement";
import { CreateMission, DeleteMission, MissionI, UpdateMission } from "@/interfaces/mission";

export const useMissionStore = defineStore("mission", () => {
    const { _getMission, _createMision, _updateMission, _deleteMission } = announcementService;

    // @ts-ignore
    const mission: Ref<MissionI> = ref({});

    async function getMission(announcementId: string) {
        try {
            const res = await _getMission(announcementId);
            mission.value = res;
        } catch (error) {
            throw error;
        }
    }

    async function createMission(payload: CreateMission) {
        try {
            const res = await _createMision(payload);
            mission.value = res;
        } catch (error) {
            throw error;
        }
    }

    async function updateMission(payload: UpdateMission) {
        try {
            const res = await _updateMission(payload);
            mission.value = res;
        } catch (error) {
            throw error;
        }
    }

    async function deleteMission(payload: DeleteMission) {
        try {
            const res = await _deleteMission(payload);
            // @ts-ignore
            mission.value = {};
        } catch (error) {
            throw error;
        }
    }

    return { mission, getMission, createMission, updateMission, deleteMission };
});
