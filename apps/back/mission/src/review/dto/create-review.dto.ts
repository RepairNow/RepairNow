import { IsNotEmpty, IsString, IsNumber, IsUUID, Min, Max } from "class-validator";

export class CreateReviewDto {

    @IsNotEmpty()
    @IsNumber()
    @Min(1, { message: "Le rating doit être supérieur ou égal à 1." })
    @Max(5, { message: "Le rating ne peut pas dépasser 5." })
    rating: number;

    @IsNotEmpty()
    @IsString()
    comment: string;

    @IsNotEmpty()
    @IsUUID()
    missionId: string;
}
