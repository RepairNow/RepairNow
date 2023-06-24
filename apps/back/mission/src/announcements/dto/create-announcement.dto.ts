import { IsNotEmpty, IsUUID, IsString, IsDate } from "class-validator"

export class CreateAnnouncementDto {
  @IsNotEmpty()
  @IsString()
  title: string

  @IsNotEmpty()
  @IsString()
  description: string
  images: File[]

  @IsNotEmpty()
  @IsString()
  address: string

  // @IsDate()
  startTime: Date

  // @IsDate()
  endTime: Date
}
