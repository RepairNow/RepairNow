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
}
