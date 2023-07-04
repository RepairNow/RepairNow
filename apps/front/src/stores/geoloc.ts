import { defineStore } from "pinia";
import { Ref, ref } from "vue";
import geolocService from "@/services/api/geolocalisation";
import { GeolocI, UpdateGeoloc } from "@/interfaces/geolocalisation";

export const useGeolocStore = defineStore("geoloc", () => {
    const { _getPosition, _getAnnouncementGeoloc, _updatePosition } = geolocService;

    // @ts-ignore
    const geoloc: Ref<GeolocI> = ref({});

    async function getPosition() {
        try {
            const res = await _getPosition();
            geoloc.value = res;
        } catch (error) {
            throw error;
        }
    }

    async function getAnnouncementGeoloc(announcementId: string) {
        try {
            const res = await _getAnnouncementGeoloc(announcementId);
            geoloc.value = res;
        } catch (error) {
            throw error;
        }
    }

    async function updatePosition(payload: UpdateGeoloc) {
        try {
            const res = await _updatePosition(payload);
            geoloc.value = res;
        } catch (error) {
            throw error;
        }
    }

    return { geoloc, getPosition, getAnnouncementGeoloc, updatePosition };
});
