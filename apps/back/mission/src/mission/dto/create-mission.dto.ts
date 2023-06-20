import { IsNotEmpty, IsUUID, IsString } from "class-validator";

export class CreateMissionDto {

    @IsNotEmpty()
    @IsUUID()
    prestataireId: string;

    @IsNotEmpty()
    @IsUUID()
    announcementId: string;
}
