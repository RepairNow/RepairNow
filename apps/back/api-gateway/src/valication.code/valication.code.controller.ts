import { Controller, Inject, Post, UseGuards, Param, Body } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('valication_code')
@UseGuards(AuthGuard)
export class ValicationCodeController {
  constructor(@Inject('MISSION_SERVICE') private missionClient: ClientProxy) { }

  @Post(':missionId')
  validateMission(@Param('missionId') missionId, @Body() validationCodeDto) {
    return this.missionClient.send({ cmd: 'validateCode' }, { missionId, validationCodeDto })
  }
}
