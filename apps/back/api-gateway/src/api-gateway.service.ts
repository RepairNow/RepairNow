import { Inject, Injectable } from '@nestjs/common';
import { resolve, join } from 'path';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { PrismaService } from '@repairnow/prisma';
import { CurrentUserDto } from '@repairnow/dto';
@Injectable()
export class ApiGatewayService {
  constructor(@Inject('AUTH_SERVICE') private authClient: ClientProxy, private prismaService: PrismaService,) {}

  refreshTokens(userId: string, refreshToken: string): Observable<string> {
    return this.authClient.send(
      { cmd: 'refresh_tokens' },
      {
        userId,
        refreshToken,
      },
    );
  }

  logout(userId: string): Observable<string> {
    return this.authClient.send(
      { cmd: 'logout' },
      {
        userId,
      },
    );
  }

  signIn(email: string, password: string): Observable<string> {
    return this.authClient.send(
      { cmd: 'sign_in_email' },
      {
        email,
        password,
      },
    );
  }

  signUp(signUpDto: {
    email: string;
    password: string;
    firstname: string;
    lastname: string;
    phoneNumber: string;
    isContractorRoleAsked?: boolean;
  }): Observable<string> {
    return this.authClient.send(
      { cmd: 'sign_up_email' },
      {
        email: signUpDto.email,
        password: signUpDto.password,
        firstname: signUpDto.firstname,
        lastname: signUpDto.lastname,
        phoneNumber: signUpDto.phoneNumber,
        isContractorRoleAsked: signUpDto.isContractorRoleAsked || false,
      },
    );
  }

  getUsers(): Observable<any> {
    return this.authClient.send({ cmd: 'get_users' }, {});
  }

  getUser(userId: string): any {
    return this.authClient.send({ cmd: 'get_user' }, { userId });
  }
  
  async getImage(payload: { res: any, id: string }) {
    const file = await this.prismaService.files.findUnique({
      where: {
        id: payload.id
      }
    });
    const dirname = resolve();
    const fullfilepath = join(dirname, file?.path);
    return payload.res.type(file.mimetype).sendFile(fullfilepath)
  }

  initiateVerification(user: any): Observable<any> {
    return this.authClient.send({ cmd: 'initiate-verification' }, user);
  }

  checkVerificationCode(payload: {
    user: any;
    verificationData: any;
  }): Observable<any> {
    return this.authClient.send({ cmd: 'check-verification-code' }, payload);
  }
}
