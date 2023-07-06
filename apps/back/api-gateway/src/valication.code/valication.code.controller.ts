import { Controller, Inject, Post, UseGuards, Param, Body, Patch, Get } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('validation_code')
@UseGuards(AuthGuard)
export class ValicationCodeController {
  constructor(@Inject('MISSION_SERVICE') private missionClient: ClientProxy) { }

  @Post(':missionId')
  validateMission(@Param('missionId') missionId, @Body() validationCodeDto) {
    return this.missionClient.send({ cmd: 'validateCode' }, { missionId, validationCodeDto })
  }

  @Patch(':missionId/end_mission_as_contractor')
  validateMissionAsContractor(@Param('missionId') missionId) {
    return this.missionClient.send({ cmd: 'validateMissionAsContractor' }, missionId)
  }

  @Get(':missionId')
  missionCode(@Param('missionId') missionId) {
    return this.missionClient.send({ cmd: 'missionCode' }, missionId)
  }
}
