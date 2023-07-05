import { PartialType } from '@nestjs/mapped-types';
import { CreateAnnouncementDto } from './create-announcement.dto';
import { IsOptional, IsNotEmpty, IsString, IsBoolean } from 'class-validator';

export class UpdateAnnouncementDto extends PartialType(CreateAnnouncementDto) {
  @IsString()
  @IsNotEmpty()
  id: string;
  @IsString()
  title: string;
  description: string;
  images: File[];
  address: string;
  @IsString()
  @IsOptional()
  currentStatus: string;
  acceptedAt: Date;
  startTime: Date;
  estimatedTime: number;
  preferredHour: string;
  @IsBoolean()
  urgency: boolean;
  jobId: string;
}
