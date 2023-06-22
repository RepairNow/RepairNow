import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  Inject,
} from '@nestjs/common';
import { ApiGatewayService } from './api-gateway.service';
import { AuthGuard } from './guards/auth.guard';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
@Controller('/')
export class ApiGatewayController {
  constructor(
    private readonly apiGatewayService: ApiGatewayService,
    @Inject('JOB_SERVICE') private jobClient: ClientProxy,
    @Inject('MISSION_SERVICE') private missionClient: ClientProxy,
  ) {}

  // Needed for k8s - Don't touch !!!
  @Get()
  health() {
    return true;
  }

  @Get('greeting')
  getGreeting(): Observable<string> {
    return this.jobClient.send({ cmd: 'greeting' }, {});
  }

  @Get('mission')
  getMissions(): Observable<string> {
    return this.missionClient.send({ cmd: 'findAllMission' }, {});
  }

  @Get('users')
  getHelloTwo(): any {
    return this.apiGatewayService.getUsers();
  }

  @UseGuards(AuthGuard)
  @Get('me')
  getMe(@Request() req) {
    return req.user;
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
