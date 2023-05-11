import {
  Body,
  Controller,
  Get,
<<<<<<< HEAD
  HttpException,
  HttpStatus,
  Request,
  UseFilters,
=======
  HttpCode,
  HttpException,
  HttpStatus,
  Request,
  UseGuards,
>>>>>>> 992847a (fix signup and signin and use class-validation for types)
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern } from '@nestjs/microservices';
<<<<<<< HEAD
import { RpcValidationFilter } from './filters/rpc-validation.filter';
// import { Public } from './auth.module';
import { SignWithEmailDto } from '@repairnow/dto';
=======
import { AuthGuard } from './auth.guard';
import { SignWithEmailDto } from './dto/sign-with-email.dto';
>>>>>>> 992847a (fix signup and signin and use class-validation for types)

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Get()
  getHello(): string {
    console.log('Hello World !');
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
<<<<<<< HEAD
  signIn(@Body(ValidationPipe) params: SignWithEmailDto) {
    return this.authService.signInEmail(params.email, params.password);
  }

  @UseFilters(new RpcValidationFilter())
=======
  signIn(@Body() params: SignWithEmailDto) {
    return this.authService.signInEmail(params.email, params.password);
  }

>>>>>>> 992847a (fix signup and signin and use class-validation for types)
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
<<<<<<< HEAD
=======
  }

  @UseGuards(AuthGuard)
  @MessagePattern({ cmd: 'get_profile' })
  getProfile(@Request() req) {
    return req.user;
>>>>>>> 992847a (fix signup and signin and use class-validation for types)
  }
}
