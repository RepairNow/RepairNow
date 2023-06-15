import { AnnouncementI, CreateAnnouncement, UpdateAnnouncement } from "@/interfaces/announcement";
import { client } from "..";
import { CreateMission, DeleteMission, MissionI, UpdateMission } from "@/interfaces/mission";
import { CreateReview, ReviewI, UpdateReview } from "@/interfaces/review";
import { CreateEstimate, EstimateI, UpdateEstimate } from "@/interfaces/estimate";

const namespace = "/announcements";

// This class contain everything related to announcement (mission, estimate and review)
class Announcement {

    async _getAnnouncements(): Promise<AnnouncementI[]> {
        try {
            const res = await client.get(namespace);
            return res.data;
        } catch (err) {
            throw err;
        }
    }

    async _getAnnouncement(announcementId: string): Promise<AnnouncementI> {
        try {
            const uri = `${namespace}/${announcementId}`;
            const res = await client.get(uri);
            return res.data;
        } catch (err) {
            throw err;
        }
    }

    async _createAnnouncement(payload: CreateAnnouncement): Promise<AnnouncementI> {
        try {
            const res = await client.post(namespace, payload);
            return res.data;
        } catch (err) {
            throw err;
        }
    }

    async _updateAnnouncement(payload: UpdateAnnouncement): Promise<AnnouncementI> {
        try {
            const uri = `${namespace}/${payload.id}`;
            const res = await client.patch(uri, payload);
            return res.data;
        } catch (err) {
            throw err;
        }
    }

    async _deleteAnnouncement(announcementId: string): Promise<AnnouncementI> {
        try {
            const uri = `${namespace}/${announcementId}`;
            const res = await client.delete(uri);
            return res.data;
        } catch (err) {
            throw err;
        }
    }

    async _getEstimates(): Promise<EstimateI[]> {
        try {
            const uri = `${namespace}/estimates`;
            const res = await client.get(uri);
            return res.data;
        } catch (err) {
            throw err;
        }
    }

    async _getEstimate(estimateId: string): Promise<EstimateI> {
        try {
            const uri = `${namespace}/estimates/${estimateId}`;
            const res = await client.get(uri);
            return res.data;
        } catch (err) {
            throw err;
        }
    }

    async _createEstimate(payload: CreateEstimate): Promise<EstimateI> {
        try {
            const uri = `${namespace}/estimates`;
            const res = await client.post(uri, payload);
            return res.data;
        } catch (err) {
            throw err;
        }
    }

    async _updateEstimate(payload: UpdateEstimate): Promise<EstimateI> {
        try {
            const uri = `${namespace}/estimates/${payload.id}`;
            const res = await client.patch(uri, payload);
            return res.data;
        } catch (err) {
            throw err;
        }
    }

    async _deleteEstimate(estimateId: string): Promise<EstimateI> {
        try {
            const uri = `${namespace}/estimates/${estimateId}`;
            const res = await client.delete(uri);
            return res.data;
        } catch (err) {
            throw err;
        }
    }

    async _getMission(announcementId: string): Promise<MissionI> {
        try {
            const uri = `${namespace}/${announcementId}/mission`;
            const res = await client.get(uri);
            return res.data;
        } catch (err) {
            throw err;
        }
    }

    async _createMision(payload: CreateMission): Promise<MissionI> {
        try {
            const uri = `${namespace}/${payload.announcementId}/mission`;
            const res = await client.post(uri, payload);
            return res.data;
        } catch (err) {
            throw err;
        }
    }

    async _updateMission(payload: UpdateMission): Promise<MissionI> {
        try {
            const uri = `${namespace}/${payload.announcementId}/mission`;
            const res = await client.patch(uri, payload);
            return res.data;
        } catch (err) {
            throw err;
        }
    }

    async _deleteMission(payload: DeleteMission): Promise<MissionI> {
        try {
            const uri = `${namespace}/${payload.announcementId}/mission`;
            const res = await client.delete(uri);
            return res.data;
        } catch (err) {
            throw err;
        }
    }

    async _getReview(announcementId: string): Promise<ReviewI> {
        try {
            const uri = `${namespace}/${announcementId}/mission/review`;
            const res = await client.get(uri);
            return res.data;
        } catch (err) {
            throw err;
        }
    }

    async _createReview(payload: CreateReview): Promise<ReviewI> {
        try {
            const uri = `${namespace}/${payload.announcementId}/mission/review`;
            const res = await client.post(uri, payload);
            return res.data;
        } catch (err) {
            throw err;
        }
    }

    async _updateReview(payload: UpdateReview): Promise<ReviewI> {
        try {
            const uri = `${namespace}/${payload.announcementId}/mission/review`;
            const res = await client.patch(uri, payload);
            return res.data;
        } catch (err) {
            throw err;
        }
    }

    async _deleteReview(announcementId: string): Promise<MissionI> {
        try {
            const uri = `${namespace}/${announcementId}/mission/review`;
            const res = await client.delete(uri);
            return res.data;
        } catch (err) {
            throw err;
        }
    }
}

const announcementService = new Announcement();

export default announcementService;