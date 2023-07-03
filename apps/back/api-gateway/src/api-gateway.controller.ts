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
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { AccessTokenGuard } from './guards/accessToken.guard';
import { RefreshTokenGuard } from './guards/refreshToken.guard';

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

  @UseGuards(AccessTokenGuard)
  @Get('users')
  getUsers(@Request() req): any {
    return this.apiGatewayService.getUsers(req.user.role);
  }

  @UseGuards(AccessTokenGuard)
  @Get('me')
  getMe(@Request() req) {
    return req.user;
  }

  @UseGuards(RefreshTokenGuard)
  @Get('refresh_tokens')
  refreshTokens(@Request() req) {
    return this.apiGatewayService.refreshTokens(
      req.user['sub'],
      req.user['refreshToken'],
    );
  }

  @UseGuards(AccessTokenGuard)
  @Get('logout')
  logout(@Request() req) {
    return this.apiGatewayService.logout(req.user['sub']);
  }

  @Post('signIn')
  signIn(@Body() signInDto: { email: string; password: string }) {
    return this.apiGatewayService.signIn(signInDto.email, signInDto.password);
  }

  @Post('signUp')
  signUp(
    @Body()
    signUpDto: {
      email: string;
      password: string;
      firstname: string;
      lastname: string;
      phoneNumber: string;
      isContractorRoleAsked: boolean;
    },
  ) {
    return this.apiGatewayService.signUp(signUpDto);
  }

  @UseGuards(AccessTokenGuard)
  @Post('initiate-verification')
  initiateVerification(@Request() req) {
    return this.apiGatewayService.initiateVerification(req.user);
  }

  @UseGuards(AccessTokenGuard)
  @Post('check-verification-code')
  checkVerificationCode(@Request() req, @Body() verificationData) {
    return this.apiGatewayService.checkVerificationCode({
      user: req.user,
      verificationData,
    });
  }
}
