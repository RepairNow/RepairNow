import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MissionService } from './mission.service';
import { CreateMissionDto } from './dto/create-mission.dto';
import { UpdateMissionDto } from './dto/update-mission.dto';

@Controller()
export class MissionController {
  constructor(private readonly missionService: MissionService) { }

  @MessagePattern('createMission')
  create(@Payload() createMissionDto: CreateMissionDto) {
    return this.missionService.create(createMissionDto);
  }

  @MessagePattern({ cmd: 'findAllMission' })
  findAll() {
    return this.missionService.findAll();
  }

  @MessagePattern('findOneMission')
  findOne(@Payload() id: number) {
    return this.missionService.findOne(id);
  }

  @MessagePattern('updateMission')
  update(@Payload() updateMissionDto: UpdateMissionDto) {
    return this.missionService.update(updateMissionDto.id, updateMissionDto);
  }

  @MessagePattern('removeMission')
  remove(@Payload() id: number) {
    return this.missionService.remove(id);
  }
}
