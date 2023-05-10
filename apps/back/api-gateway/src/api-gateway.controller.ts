import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiGatewayService } from './api-gateway.service';

@Controller('/')
export class ApiGatewayController {
  constructor(private readonly apiGatewayService: ApiGatewayService) {}

  // Needed for k8s - Don't touch !!!
  @Get()
  health() {
    return true;
  }

  @Get('hello')
  getHello(): string {
    console.log('getHello');
    return this.apiGatewayService.getHello();
  }

  @Get('users')
  getHelloTwo(): any {
    return this.apiGatewayService.getUsers();
  }

  @Get('auth')
  callAuth() {
    return this.apiGatewayService.callAuth();
  }

  @Get('profile')
  getProfile() {
    return this.apiGatewayService.getProfile();
  }

  @Post('signIn')
  signIn(@Body() signInDto: { email: string; password: string }) {
    return this.apiGatewayService.signIn(signInDto.email, signInDto.password);
  }

  @Post('signUp')
  signUp(@Body() signInDto: { email: string; password: string }) {
    return this.apiGatewayService.signUp(signInDto.email, signInDto.password);
  }
}
