import { Controller, Get } from '@nestjs/common';
import { ApiGatewayService } from './api-gateway.service';

@Controller()
export class ApiGatewayController {
  constructor(private readonly apiGatewayService: ApiGatewayService) { }

  @Get("hello")
  getHello(): string {
    return this.apiGatewayService.getHello();
  }

  @Get('auth')
  callAuth() {
    return this.apiGatewayService.callAuth();
  }
}
