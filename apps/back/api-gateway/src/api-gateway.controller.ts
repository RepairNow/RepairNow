import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  Inject,
  Param,
  Response,
  Patch,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator
} from '@nestjs/common';
import { ApiGatewayService } from './api-gateway.service';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { AccessTokenGuard } from './guards/accessToken.guard';
import { RefreshTokenGuard } from './guards/refreshToken.guard';
import PermissionGuard from './guards/permissionGuard';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from './guards/auth.guard';

@Controller('/')
export class ApiGatewayController {
  constructor(
    private readonly apiGatewayService: ApiGatewayService,
    @Inject('JOB_SERVICE') private jobClient: ClientProxy,
    @Inject('MISSION_SERVICE') private missionClient: ClientProxy,
    @Inject('AUTH_SERVICE') private authClient: ClientProxy,
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

  @Get('uploads/:id')
  getImage(@Response() res, @Param('id') params) {
    return this.apiGatewayService.getImage({ res, id: params });
  }

  @Get('mission')
  getMissions(): Observable<string> {
    return this.missionClient.send({ cmd: 'findAllMission' }, {});
  }

  @UseGuards(PermissionGuard('ADMIN'))
  @Get('user/:userId')
  getUser(@Param('userId') userId: string): any {
    return this.apiGatewayService.getUser(userId);
  }

  @UseGuards(PermissionGuard('ADMIN'))
  @Patch('user/:userId')
  patchUser(@Param('userId') userId: string, @Body() updateUserDto: any): any {
    return this.apiGatewayService.patchUser(userId, updateUserDto);
  }

  @UseGuards(PermissionGuard('ADMIN'))
  @Get('users')
  getUsers(): any {
    return this.apiGatewayService.getUsers();
  }

  /** Return infos inside token and tokens too */
  @UseGuards(AccessTokenGuard)
  @Get('me')
  getMe(@Request() req) {
    return req.user;
  }

  @Patch('me/avatar')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  updateAvatar(
    @UploadedFile(new ParseFilePipe({ validators: [new MaxFileSizeValidator({ maxSize: 1000000 })]})) file: Express.Multer.File,
    @Request() request,
  ): Observable<any> {
    const { user } = request;
    return this.authClient.send({ cmd: 'update_avatar' }, { file, user });
  }

  @Post('reset_password')
  @UseGuards(AuthGuard)
  resetPassword(
    @Request() request,
    @Body() payload: { oldPassword: string; newPassword },
  ): Observable<any> {
    const { user } = request;
    return this.authClient.send(
      { cmd: 'reset_password' },
      { user, ...payload },
    );
  }

  @Post('password_forgotten')
  passwordForgotten(@Body() payload: { email: string }): Observable<any> {
    return this.authClient.send({ cmd: 'password_forgotten' }, payload);
  }

  @UseGuards(AccessTokenGuard)
  @Get('me-all-infos')
  getAllMyInfos(@Request() req) {
    return this.apiGatewayService.getUser(req.user['sub']);
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
      isContractorRoleAsked?: boolean;
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
