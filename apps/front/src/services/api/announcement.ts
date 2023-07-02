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

    async _getSelfAnnouncement(): Promise<AnnouncementI[]> {
        try {
            const uri = `${namespace}/my-announcements`;
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

    /**
     * Estimate
     */

    async _getAnnouncementEstimates(announcementId: string): Promise<EstimateI[]> {
        try {
            const uri = `${namespace}/${announcementId}/estimates`;
            const res = await client.get(uri);
            return res.data;
        } catch (err) {
            throw err;
        }
    }

    async _getAnnouncementEstimate(payload: { estimateId: string, announcementId: string }): Promise<EstimateI> {
        try {
            const uri = `${namespace}/${payload.announcementId}/estimates/${payload.estimateId}`;
            const res = await client.get(uri);
            return res.data;
        } catch (err) {
            throw err;
        }
    }

    async _createAnnouncementEstimate(announcementId: string, payload: CreateEstimate): Promise<EstimateI> {
        try {
            const uri = `${namespace}/${announcementId}/estimates`;
            const res = await client.post(uri, payload);
            return res.data;
        } catch (err) {
            throw err;
        }
    }

    async _updateAnnouncementEstimate(payload: UpdateEstimate): Promise<EstimateI> {
        try {
            const uri = `${namespace}/${payload.announcementId}/estimates/${payload.id}`;
            const res = await client.patch(uri, payload);
            return res.data;
        } catch (err) {
            throw err;
        }
    }

    async _deleteAnnouncementEstimate(payload: { estimateId: string, announcementId: string }): Promise<EstimateI> {
        try {
            const uri = `${namespace}/${payload.announcementId}/estimates/${payload.estimateId}`;
            const res = await client.delete(uri);
            return res.data;
        } catch (err) {
            throw err;
        }
    }

    async _acceptAnnouncementEstimate(payload: { estimateId: string, announcementId: string}): Promise<EstimateI> {
        try {
            const uri = `${namespace}/${payload.announcementId}/estimates/${payload.estimateId}/accept_estimate`;
            const res = await client.patch(uri);
            return res.data;
        } catch (err) {
            throw err;
        }
    }

    /**
     * Mission
     */

    async _getAnnouncementMission(announcementId: string): Promise<MissionI> {
        try {
            const uri = `${namespace}/${announcementId}/mission`;
            const res = await client.get(uri);
            return res.data;
        } catch (err) {
            throw err;
        }
    }

    async _createAnnouncementMission(payload: CreateMission): Promise<MissionI> {
        try {
            const uri = `${namespace}/${payload.announcementId}/mission`;
            const res = await client.post(uri, payload);
            return res.data;
        } catch (err) {
            throw err;
        }
    }

    async _updateAnnouncementMission(payload: UpdateMission): Promise<MissionI> {
        try {
            const uri = `${namespace}/${payload.announcementId}/mission`;
            const res = await client.patch(uri, payload);
            return res.data;
        } catch (err) {
            throw err;
        }
    }

    async _deleteAnnouncementMission(payload: DeleteMission): Promise<MissionI> {
        try {
            const uri = `${namespace}/${payload.announcementId}/mission`;
            const res = await client.delete(uri);
            return res.data;
        } catch (err) {
            throw err;
        }
    }

    /**
     * Review
     */

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