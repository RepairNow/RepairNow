import { GeolocI, UpdateGeoloc } from "@/interfaces/geolocalisation";
import { client } from "..";

const namespace = "/geoloc"
class Geolocalisation {

    async _getPosition(): Promise<GeolocI> {
        try {
            const uri = `${namespace}`;
            const res = await client.get(uri);
            return res.data;
        } catch (error) {
            throw error;
        }
    }

    async _updatePosition(payload: UpdateGeoloc): Promise<GeolocI> {
        try {
            const uri = `${namespace}`;
            const res = await client.patch(uri, payload);
            return res.data;
        } catch (error) {
            throw error;
        }
    }
}

const geolocService = new Geolocalisation();

export default geolocService;