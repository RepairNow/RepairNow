import { defineStore } from "pinia";
import { Ref, ref } from "vue";
import { MissionI } from "@/interfaces/mission";
import missionService from "@/services/api/mission";

export const useMissionStore = defineStore("mission", () => {
    const { _getMissions, _getSelfMissions, _getMission } = missionService;

    // @ts-ignore
    const mission: Ref<MissionI> = ref({});
    const missions: Ref<MissionI[]> = ref([]);

    async function getMissions() {
        try {
            const res = await _getMissions();
            missions.value = res;
        } catch (error) {
            throw error;
        }
    }

    async function getMission(missionId: string) {
        try {
            const res = await _getMission(missionId);
            mission.value = res;
        } catch (error) {
            throw error;
        }
    }

    async function getSelfMissions(status: string) {
        try {
            const res = await _getSelfMissions(status);
            missions.value = res;
        } catch (error) {
            throw error;
        }
    }

    return { mission, missions, getMission, getMissions, getSelfMissions };
});
