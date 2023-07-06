import { AnnouncementI, CreateAnnouncement, UpdateAnnouncement } from "@/interfaces/announcement";
import { client } from "..";
import { CreateMission, DeleteMission, MissionI, UpdateMission } from "@/interfaces/mission";
import { CreateReview, ReviewI, UpdateReview } from "@/interfaces/review";
import { CreateEstimate, EstimateI, UpdateEstimate } from "@/interfaces/estimate";

const namespace = "/missions";

// This class contain everything related to announcement (mission, estimate and review)
class Mission {

    async _getMissions(): Promise<MissionI[]> {
        try {
            const res = await client.get(namespace);
            return res.data;
        } catch (err) {
            throw err;
        }
    }

    async _getMission(missionId: string): Promise<MissionI> {
        try {
            const uri = `${namespace}/${missionId}`;
            const res = await client.get(uri);
            return res.data;
        } catch (err) {
            throw err;
        }
    }

    async _getSelfMissions(status: string): Promise<MissionI[]> {
        try {
            const uri = `${namespace}/my-missions?status=${status}`;
            const res = await client.get(uri);
            console.log(res.data)

            return res.data;
        } catch (err) {
            throw err;
        }
    }

    async _updateMission(payload: UpdateMission): Promise<MissionI> {
        try {
            const uri = `${namespace}/${payload.id}`;
            const res = await client.patch(uri, payload);
            return res.data;
        } catch (err) {
            throw err;
        }
    }
}

const missionService = new Mission();

export default missionService;