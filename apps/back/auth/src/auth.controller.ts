import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Request,
  UseFilters,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern } from '@nestjs/microservices';
import { RpcValidationFilter } from './filters/rpc-validation.filter';
// import { Public } from './auth.module';
import { SignWithEmailDto } from '@repairnow/dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Get()
  getHello(): string {
    console.log('getHellsery');
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

  @UseFilters(new RpcValidationFilter())
  @MessagePattern({ cmd: 'sign_in_email' })
  signIn(@Body(ValidationPipe) params: SignWithEmailDto) {
    return this.authService.signInEmail(params.email, params.password);
  }

  @UseFilters(new RpcValidationFilter())
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
}
