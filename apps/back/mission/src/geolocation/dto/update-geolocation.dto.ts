import { IsNotEmpty, IsOptional, IsUUID, Min, Max } from "class-validator";

export class UpdateGeolocationDto {
  @IsOptional()
  @IsUUID()
  id: string;

  @IsNotEmpty()
  @Min(-90)
  @Max(90)
  x: number;

  @IsNotEmpty()
  @Min(-180)
  @Max(180)
  y: number;

  @IsNotEmpty()
  z: number;

  @IsNotEmpty()
  @IsUUID()
  missionId: string;

  @IsNotEmpty()
  @IsUUID()
  userId: string;
}
