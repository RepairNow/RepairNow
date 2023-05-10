import { Controller, Get } from '@nestjs/common';
import { ApiGatewayService } from './api-gateway.service';

@Controller('/')
export class ApiGatewayController {
  constructor(private readonly apiGatewayService: ApiGatewayService) { }

  // create a route health check
  @Get()
  health() {
    return true;
  }

  @Get("hello")
  getHello(): string {
    console.log("getHello");
    return this.apiGatewayService.getHello();
  }

  @Get('auth')
  callAuth() {
    return this.apiGatewayService.callAuth();
  }
}
