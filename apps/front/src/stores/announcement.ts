import { defineStore } from "pinia";
import { Ref, ref } from "vue";
import announcementService from "@/services/api/announcement";
import { AnnouncementI, CreateAnnouncement, UpdateAnnouncement } from "@/interfaces/announcement";
import {CreateMission, DeleteMission, MissionI, UpdateMission} from "@/interfaces/mission";
import {CreateEstimate, EstimateI, UpdateEstimate} from "@/interfaces/estimate";
import {CreateReview, ReviewI, UpdateReview} from "@/interfaces/review";

export const useAnnouncementStore = defineStore("announcement", () => {
    const {
        _getSelfAnnouncement,
        _getAnnouncements,
        _createAnnouncement,
        _updateAnnouncement,
        _deleteAnnouncement,
        _getAnnouncement,
        _getAnnouncementMission,
        _createAnnouncementMission,
        _updateAnnouncementMission,
        _deleteAnnouncementMission,
        _createAnnouncementEstimate,
        _updateAnnouncementEstimate,
        _deleteAnnouncementEstimate,
        _getAnnouncementEstimates,
        _getAnnouncementEstimate,
        _createReview,
        _deleteReview,
        _getReview,
        _updateReview
    } = announcementService;

    const announcements: Ref<AnnouncementI[]> = ref([]);
    // @ts-ignore
    const announcement: Ref<AnnouncementI> = ref({});

    async function getAnnouncements() {
        try {
            const res = await _getAnnouncements();
            announcements.value = res;
        } catch (error) {
            throw error;
        }
    }

    async function getAnnouncement(announcementId: string) {
        try {
            const res = await _getAnnouncement(announcementId);
            announcement.value = res;
        } catch (error) {
            throw error;
        }
    }

    async function getSelfAnnouncement(status: string){
        try {
            const res = await _getSelfAnnouncement(status)
            announcements.value = res;
        } catch (error) {
            throw error;
        }
    }

    async function createAnnouncement(payload: CreateAnnouncement) {
        try {
            const res = await _createAnnouncement(payload);
            announcements.value.push(res);
            return res;
        } catch (error) {
            throw error;
        }
    }

    async function updateAnnouncement(payload: UpdateAnnouncement) {
        try {
            const res = await _updateAnnouncement(payload);
            const announcementIdToUpdateIndex = announcements.value.findIndex(a => a.id === res.id);
            announcements.value.splice(announcementIdToUpdateIndex, 1, res);
        } catch (error) {
            throw error;
        }
    }

    async function deleteAnnouncement(announcementId: string) {
        try {
            const res = await _deleteAnnouncement(announcementId);
            const announcementIdToDeleteIndex = announcements.value.findIndex(a => a.id === announcementId);
            announcements.value.splice(announcementIdToDeleteIndex, 1);
        } catch (error) {
            throw error;
        }
    }

    /**
     * Announcement mission
     */

    // @ts-ignore
    const announcementMission: Ref<MissionI> = ref({})

    async function getAnnouncementMission(announcementId: string)
    {
        try {
            const res = await _getAnnouncementMission(announcementId);
            announcementMission.value = res
        } catch (e) {
            throw e;
        }
    }

    async function createAnnouncementMission(payload: CreateMission) {
        try {
            const res = await _createAnnouncementMission(payload);
            announcementMission.value = res
        } catch (e) {
            throw e;
        }
    }

    async function updateAnnouncementMission(payload: UpdateMission) {
        try {
            const res = await _updateAnnouncementMission(payload);
            announcementMission.value = res
        } catch (e) {
            throw e;
        }
    }

    async function deleteAnnouncementMission(payload: DeleteMission) {
        try {
            const res = await _deleteAnnouncementMission(payload);
        } catch (e) {
            throw e;
        }
    }

    /**
     * Announcement estimate
     */

    // @ts-ignore
    const announcementEstimate: Ref<EstimateI> = ref({})
    const announcementEstimates: Ref<EstimateI[]> = ref([])

    async function createAnnouncementEstimate(announcementId: string, payload: CreateEstimate) {
        try {
            const res = await _createAnnouncementEstimate(announcementId, payload);
            announcementEstimate.value = res
        } catch (e) {
            throw e;
        }
    }

    async function updateAnnouncementEstimate(payload: UpdateEstimate) {
        try {
            const res = await _updateAnnouncementEstimate(payload);
            announcementEstimate.value = res
        } catch (e) {
            throw e;
        }
    }

    async function deleteAnnouncementEstimate(payload: {announcementId: string, estimateId: string}) {
        try {
            const res = await _deleteAnnouncementEstimate(payload);
        } catch (e) {
            throw e;
        }
    }

    async function getAnnouncementEstimates(announcementId: string) {
        try {
            const res = await _getAnnouncementEstimates(announcementId);
            announcementEstimates.value = res
        } catch (e) {
            throw e;
        }
    }

    async function getAnnouncementEstimate(payload: { announcementId: string, estimateId: string }) {
        try {
            const res = await _getAnnouncementEstimate(payload);
            announcementEstimate.value = res
        } catch (e) {
            throw e;
        }
    }

    /**
     * Announcement review
     */

    //@ts-ignore
    const announcementReview: Ref<ReviewI> = ref({})

    async function createAnnouncementReview(announcementId: string, payload: CreateReview) {
        console.log(announcementId)
        console.log(payload)
        try {
            const res = await _createReview(announcementId, payload);
            announcementReview.value = res
        } catch (error) {
            throw error
        }
    }

    async function updateAnnouncementReview(announcementId: string, payload: UpdateReview) {
        try {
            const res = await _updateReview(announcementId, payload);
            announcementReview.value = res
        } catch (error) {
            throw error
        }
    }

    return {
        announcement,
        announcements,
        getAnnouncements,
        getAnnouncement,
        getSelfAnnouncement,
        createAnnouncement,
        updateAnnouncement,
        deleteAnnouncement,
        announcementMission,
        getAnnouncementMission,
        createAnnouncementMission,
        updateAnnouncementMission,
        deleteAnnouncementMission,
        announcementEstimate,
        announcementEstimates,
        createAnnouncementEstimate,
        updateAnnouncementEstimate,
        deleteAnnouncementEstimate,
        getAnnouncementEstimate,
        getAnnouncementEstimates,
        createAnnouncementReview,
        updateAnnouncementReview
    };
});
