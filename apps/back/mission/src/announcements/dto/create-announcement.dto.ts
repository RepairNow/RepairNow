import { IsNotEmpty, IsString, IsBoolean, IsNumber } from 'class-validator';

export class CreateAnnouncementDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  preferredHour: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  startTime: Date;

  @IsNumber()
  estimatedTime: number;

  @IsNotEmpty()
  @IsString()
  jobId: string;

  @IsBoolean()
  urgency: boolean;
}
