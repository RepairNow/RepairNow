import { Controller, UseFilters, ValidationPipe } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MissionService } from './mission.service';
import { CreateMissionDto } from './dto/create-mission.dto';
import { UpdateMissionDto } from './dto/update-mission.dto';
import { RpcValidationFilter } from 'src/filters/rpc-validation.filter';

@Controller()
export class MissionController {
  constructor(private readonly missionService: MissionService) { }

  @MessagePattern({ cmd: 'createMission' })
  @UseFilters(RpcValidationFilter)
  create(@Payload(ValidationPipe) createMissionDto: CreateMissionDto) {
    return this.missionService.create(createMissionDto);
  }

  @MessagePattern({ cmd: 'findAllMission' })
  findAll() {
    return this.missionService.findAll();
  }

  @MessagePattern('findOneMission')
  findOne(@Payload() id: string) {
    return this.missionService.findOne(id);
  }

  @MessagePattern('updateMission')
  update(@Payload() updateMissionDto: UpdateMissionDto) {
    return this.missionService.update(updateMissionDto.id, updateMissionDto);
  }

  @MessagePattern('removeMission')
  remove(@Payload() id: string) {
    return this.missionService.remove(id);
  }
}
