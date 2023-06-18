import { IsNotEmpty, IsUUID, IsString, IsDate } from "class-validator"

export class CreateAnnouncementDto {
  @IsUUID()
  @IsNotEmpty()
  userId: string

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

  @IsString()
  currentStatus: string
  // @IsDate()
  startTime: Date

  // @IsDate()
  endTime: Date
}
