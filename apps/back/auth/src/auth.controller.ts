import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern } from '@nestjs/microservices';
import { AuthGuard } from './auth.guard';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  getHello(): string {
    return this.authService.getHello();
  }

  @MessagePattern({ cmd: 'call_auth' })
  callAuth(): any {
    return 'Auth called';
  }

  @MessagePattern({ cmd: 'get_users' })
  getUsers(): any {
    return this.authService.getUsers();
  }

  @HttpCode(HttpStatus.OK)
  @MessagePattern({ cmd: 'sign_in_email' })
  signIn(@Body() signInDto: { email: string; password: string }) {
    return this.authService.signInEmail(signInDto.email, signInDto.password);
  }

  @HttpCode(HttpStatus.CREATED)
  @MessagePattern({ cmd: 'sign_up_email' })
  signUp(
    @Body()
    signInDto: {
      email: string;
      password: string;
    },
  ) {
    return this.authService.signUpEmail(signInDto.email, signInDto.password);
  }

  @UseGuards(AuthGuard)
  @MessagePattern({ cmd: 'get_profile' })
  getProfile(@Request() req) {
    return req.user;
  }
}
