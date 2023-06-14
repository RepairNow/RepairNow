import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiGatewayService } from './api-gateway.service';
import { AuthGuard } from './guards/auth.guard';
import { ApiBearerAuth, SignWithEmailDto } from '@repairnow/dto';

@Controller('/')
export class ApiGatewayController {
  constructor(private readonly apiGatewayService: ApiGatewayService) { }

  // Needed for k8s - Don't touch !!!
  @Get()
  health() {
    return true;
  }

  @Get('hello')
  getHello(): string {
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

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('me')
  async getMe(@Req() req) {
    // UseGuard will add to the request the user object
    // Use this user object to get the user info
    const userInfos = req.user;
    return userInfos;

    // TO PASS JWT TOKEN TO MICROSERVICES:
    // const jwt_token = req.token:
    // return this.apiGatewayService.getMe(jwt_token);
  }

  @Post('signIn')
  signIn(@Body() signInDto: SignWithEmailDto) {
    return this.apiGatewayService.signIn(signInDto.email, signInDto.password);
  }

  @Post('signUp')
  signUp(@Body() signInDto: SignWithEmailDto) {
    return this.apiGatewayService.signUp(signInDto.email, signInDto.password);
  }
}
