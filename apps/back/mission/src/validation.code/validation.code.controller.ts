import { Controller } from '@nestjs/common';
import { ValidationCodeService } from './validation.code.service';
import { Payload, MessagePattern } from '@nestjs/microservices';
import { ValicationCodeDto } from './dto/validationCodeDto';
@Controller()
export class ValidationCodeController {
  constructor(private readonly validationCodeService: ValidationCodeService) { }

  @MessagePattern({ cmd: 'validateCode' })
  validateCode(@Payload() payload: { missionId: string, validationCodeDto: ValicationCodeDto }) {
    return this.validationCodeService.create(payload);
  }

  @MessagePattern({ cmd: 'validateMissionAsContractor' })
  validateMissionAsContractor(@Payload() missionId: string) {
    return this.validationCodeService.validateMissionAsContractor(missionId);
  }

  @MessagePattern({ cmd: 'missionCode' })
  missionCode(@Payload() missionId: string) {
    return this.validationCodeService.missionCode(missionId);
  }
}
