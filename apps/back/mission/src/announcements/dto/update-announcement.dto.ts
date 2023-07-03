import { PartialType } from '@nestjs/mapped-types';
import { CreateAnnouncementDto } from './create-announcement.dto';
import { IsOptional, IsNotEmpty, IsString, IsDate, IsBoolean } from "class-validator"

export class UpdateAnnouncementDto extends PartialType(CreateAnnouncementDto) {
  @IsString()
  @IsNotEmpty()
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
  @IsBoolean()
  urgency: boolean
  jobId: string
}
