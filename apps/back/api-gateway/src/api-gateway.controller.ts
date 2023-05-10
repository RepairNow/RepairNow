<<<<<<< HEAD
import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
=======
import { Body, Controller, Get, Post } from '@nestjs/common';
>>>>>>> a256722 (add authentication back. Fail inside auth.guard.ts)
import { ApiGatewayService } from './api-gateway.service';
import { AuthGuard } from './guards/auth.guard';
import { ApiBearerAuth, SignWithEmailDto } from '@repairnow/dto';

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
<<<<<<< HEAD
=======
    console.log('getHello');
>>>>>>> a256722 (add authentication back. Fail inside auth.guard.ts)
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

<<<<<<< HEAD
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
=======
  @Get('profile')
  getProfile() {
    return this.apiGatewayService.getProfile();
  }

  @Post('signIn')
  signIn(@Body() signInDto: { email: string; password: string }) {
>>>>>>> a256722 (add authentication back. Fail inside auth.guard.ts)
    return this.apiGatewayService.signIn(signInDto.email, signInDto.password);
  }

  @Post('signUp')
<<<<<<< HEAD
  signUp(@Body() signInDto: SignWithEmailDto) {
=======
  signUp(@Body() signInDto: { email: string; password: string }) {
>>>>>>> a256722 (add authentication back. Fail inside auth.guard.ts)
    return this.apiGatewayService.signUp(signInDto.email, signInDto.password);
  }
}
