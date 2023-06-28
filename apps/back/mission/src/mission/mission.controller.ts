import { Controller, UseFilters, ValidationPipe } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MissionService } from './mission.service';
import { CreateMissionDto } from './dto/create-mission.dto';
import { UpdateMissionDto } from './dto/update-mission.dto';
import { RpcValidationFilter } from 'src/filters/rpc-validation.filter';

@Controller()
export class MissionController {
  constructor(private readonly missionService: MissionService) { }

  @MessagePattern({ cmd: 'findAllMission' })
  findAll() {
    return this.missionService.findAll();
  }

  @MessagePattern({ cmd: 'findOneMission' })
  findOne(@Payload() payload: { id: string }) {
    return this.missionService.findOne(payload);
  }

  @MessagePattern({ cmd: 'createMission' })
  @UseFilters(RpcValidationFilter)
  create(@Payload(ValidationPipe) payload: {createMissionDto: CreateMissionDto, announcementId: string}) {
    return this.missionService.create(payload);
  }

  @MessagePattern({ cmd: 'updateMission' })
  @UseFilters(RpcValidationFilter)
  update(@Payload(ValidationPipe) payload: {updateMissionDto: UpdateMissionDto, id: string}) {
    return this.missionService.update(payload);
  }

  @MessagePattern({ cmd: 'removeMission' })
  remove(@Payload() id: string) {
    return this.missionService.remove(id);
  }
}
