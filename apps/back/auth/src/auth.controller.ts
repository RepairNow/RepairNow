import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Request,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern } from '@nestjs/microservices';
import { AuthGuard } from './auth.guard';
import { SignWithEmailDto } from './dto/sign-with-email.dto';

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
  signIn(@Body() params: SignWithEmailDto) {
    return this.authService.signInEmail(params.email, params.password);
  }

  @MessagePattern({ cmd: 'sign_up_email' })
  async signUp(
    @Body(ValidationPipe)
    params: SignWithEmailDto,
  ) {
    const isUserExist = await this.authService.isUserExist(params.email);
    if (isUserExist) {
      return new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
    return this.authService.signUpEmail(params.email, params.password);
  }

  @UseGuards(AuthGuard)
  @MessagePattern({ cmd: 'get_profile' })
  getProfile(@Request() req) {
    return req.user;
  }
}
