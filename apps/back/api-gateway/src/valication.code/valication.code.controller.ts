import { Controller, Inject, Post, UseGuards, Param } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('valication_code')
@UseGuards(AuthGuard)
export class ValicationCodeController {
  constructor(@Inject('MISSION_SERVICE') private missionClient: ClientProxy) { }

  @Post(':missionId')
  validateMission(@Param('missionId') params) {
    return this.missionClient.send({ cmd: 'validateCode' }, params.id)
  }
}
