import {
  Controller,
  UseInterceptors,
  ClassSerializerInterceptor,
  BadRequestException,
} from '@nestjs/common';
import SmsService from './sms.service';
import { RpcValidationFilter } from 'src/filters/rpc-validation.filter';
import { UseFilters } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

// @Controller('sms')
@UseInterceptors(ClassSerializerInterceptor)
export default class SmsController {
  constructor(private readonly smsService: SmsService) {}

  @UseFilters(new RpcValidationFilter())
  @MessagePattern({ cmd: 'initiate-verification' })
  async initiatePhoneNumberVerification(@Payload() user: any) {
    if (user.isPhoneVerified) {
      throw new BadRequestException('Phone number already confirmed');
    }
    await this.smsService.initiatePhoneNumberVerification(user.phoneNumber);
    return 'Verification code sent';
  }

  @UseFilters(new RpcValidationFilter())
  @MessagePattern({ cmd: 'check-verification-code' })
  async checkVerificationCode(
    @Payload() payload: { user: any; verificationData: any },
  ) {
    if (payload.user.isPhoneVerified) {
      throw new BadRequestException('Phone number already confirmed');
    }
    return await this.smsService.confirmPhoneNumber(
      payload.user.sub,
      payload.user.phoneNumber,
      payload.verificationData.code,
    );
  }
}
