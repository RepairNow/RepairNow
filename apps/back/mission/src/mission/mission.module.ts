import { Module } from '@nestjs/common';
import { MissionService } from './mission.service';
import { MissionController } from './mission.controller';

@Module({
  controllers: [MissionController],
  providers: [MissionService]
})
export class MissionModule {}
