import {
  Body,
  Controller,
  Get,
  HttpException,
  ForbiddenException,
  HttpStatus,
  UseFilters,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RpcValidationFilter } from './filters/rpc-validation.filter';
import { SignInDto, SignUpDto } from './dto/sign-with-email.dto';
import { CurrentUserDto } from '@repairnow/dto';
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  getHello(): string {
    return this.authService.getHello();
  }

  @UseFilters(new RpcValidationFilter())
  @MessagePattern({ cmd: 'get_users' })
  getUsers(): any {
    return this.authService.getUsers();
  }

  @UseFilters(new RpcValidationFilter())
  @MessagePattern({ cmd: 'get_user' })
  getUser(@Payload() payload: { userId: string }): any {
    return this.authService.getUser(payload.userId);
  }

  @UseFilters(new RpcValidationFilter())
  @MessagePattern({ cmd: 'update_avatar' })
  updateAvatar(@Payload() payload: { file: Express.Multer.File, user: CurrentUserDto }) {
    return this.authService.updateAvatar(payload);
  }

  @UseFilters(new RpcValidationFilter())
  @MessagePattern({ cmd: 'refresh_tokens' })
  refreshTokens(@Payload() payload: { userId: string; refreshToken: string }) {
    return this.authService.refreshTokens(payload.userId, payload.refreshToken);
  }

  @UseFilters(new RpcValidationFilter())
  @MessagePattern({ cmd: 'logout' })
  logout(@Payload() payload: { userId: string }) {
    return this.authService.logout(payload.userId);
  }

  @UseFilters(new RpcValidationFilter())
  @MessagePattern({ cmd: 'sign_in_email' })
  signIn(@Body(ValidationPipe) params: SignInDto) {
    return this.authService.signInEmail(params.email, params.password);
  }

  @UseFilters(new RpcValidationFilter())
  @MessagePattern({ cmd: 'sign_up_email' })
  async signUp(
    @Body(ValidationPipe)
    params: SignUpDto,
  ) {
    const isUserExist = await this.authService.isUserExist(params.email);
    if (isUserExist) {
      return new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
    return this.authService.signUpEmail(params);
  }

  @UseFilters(new RpcValidationFilter())
  @MessagePattern({ cmd: 'reset_password' })
  resetPassword(@Payload() payload: { user: CurrentUserDto, oldPassword: string, newPassword: string }) {
    return this.authService.resetPassword(payload);
  }

  @UseFilters(new RpcValidationFilter())
  @MessagePattern({ cmd: 'password_forgotten' })
  passwordForgotten(@Payload() payload: { email: string }) {
    return this.authService.passwordForgotten(payload);
  }
}
