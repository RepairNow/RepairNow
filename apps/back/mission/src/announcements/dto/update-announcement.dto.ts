import { PartialType } from '@nestjs/mapped-types';
import { CreateAnnouncementDto } from './create-announcement.dto';
import { IsOptional, IsUUID, IsString, IsDate } from "class-validator"

export class UpdateAnnouncementDto extends PartialType(CreateAnnouncementDto) {
  id: string;
  @IsString()
  title: string
  description: string
  images: File[]
  address: string
  @IsString()
  @IsOptional()
  currentStatus: string
  acceptedAt: Date
  startTime: Date
  endTime: Date
}
