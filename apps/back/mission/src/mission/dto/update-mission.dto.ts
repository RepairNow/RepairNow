import { PartialType } from '@nestjs/mapped-types';
import { CreateMissionDto } from './create-mission.dto';
import { IsIn } from 'class-validator';
import { MissionStatus } from '../enums/mission-status.enum';

export class UpdateMissionDto extends PartialType(CreateMissionDto) {

  @IsIn([MissionStatus.IN_PROGRESS, MissionStatus.DONE])
  currentStatus: string;
}
