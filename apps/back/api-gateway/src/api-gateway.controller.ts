import { Controller, Get } from '@nestjs/common';
import { ApiGatewayService } from './api-gateway.service';

@Controller('/')
export class ApiGatewayController {
  constructor(private readonly apiGatewayService: ApiGatewayService) { }

  // Needed for k8s - Don't touch !!!
  @Get()
  health() {
    return true;
  }

  @Get("hello")
  getHello(): string {
    return this.apiGatewayService.getHello();
  }

  @Get("users")
  getHelloTwo(): any {
    return this.apiGatewayService.getUsers();
  }

  @Get('auth')
  callAuth() {
    return this.apiGatewayService.callAuth();
  }
}
