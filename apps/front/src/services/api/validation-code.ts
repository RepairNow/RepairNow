import { client } from "..";
import {ValidationCodeI} from "@/interfaces/validation_code";

const namespace = "/validation_code";

// This class contain everything related to announcement (mission, estimate and review)
class ValidationCode {

    async _getValidationCode(missionId: string): Promise<ValidationCodeI> {
        try {
            const res = await client.get(`${namespace}/${missionId}`);
            return res.data;
        } catch (err) {
            throw err;
        }
    }

    async _validateCode(missionId: string, code: number): Promise<ValidationCodeI> {
        try {
            const uri = `${namespace}/${missionId}`;
            const res = await client.post(uri, {
                code: code
            });
            return res.data;
        } catch (err) {
            throw err;
        }
    }

    async _contractorConfirmation(missionId: string): Promise<ValidationCodeI> {
        try {
            const uri = `${namespace}/${missionId}/end_mission_as_contractor`;
            const res = await client.patch(uri, {});
            return res.data;
        } catch (err) {
            throw err;
        }
    }
}

const validationCodeService = new ValidationCode();

export default validationCodeService;