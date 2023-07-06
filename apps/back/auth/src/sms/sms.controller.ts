import {
  Controller,
  UseInterceptors,
  ClassSerializerInterceptor,
  BadRequestException,
} from '@nestjs/common';
import SmsService from './sms.service';
import { UsersService } from '../users/users.service';
import { RpcValidationFilter } from 'src/filters/rpc-validation.filter';
import { UseFilters } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

// @Controller('sms')
@UseInterceptors(ClassSerializerInterceptor)
export default class SmsController {
  constructor(
    private readonly smsService: SmsService,
    private readonly usersService: UsersService,
  ) {}

  @UseFilters(new RpcValidationFilter())
  @MessagePattern({ cmd: 'initiate-verification' })
  async initiatePhoneNumberVerification(
    @Payload()
    payload: {
      user: any;
      phoneNumber: {
        phoneNumber: string;
      };
    },
  ) {
    if (payload.user.isPhoneVerified) {
      throw new BadRequestException('Phone number already confirmed');
    }
    const respSendSMS = await this.smsService.initiatePhoneNumberVerification(
      payload.phoneNumber.phoneNumber,
    );
    if (respSendSMS.status === 'pending') {
      await this.usersService.updateUser(
        {
          phoneNumber: payload.phoneNumber.phoneNumber,
        },
        payload.user.sub,
      );
    }
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
