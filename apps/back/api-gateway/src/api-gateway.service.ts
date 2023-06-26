import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Injectable()
export class ApiGatewayService {
  constructor(@Inject('AUTH_SERVICE') private authClient: ClientProxy) {}

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
  }): Observable<string> {
    return this.authClient.send(
      { cmd: 'sign_up_email' },
      {
        email: signUpDto.email,
        password: signUpDto.password,
        firstname: signUpDto.firstname,
        lastname: signUpDto.lastname,
        phoneNumber: signUpDto.phoneNumber,
      },
    );
  }

  getUsers(): Observable<any> {
    return this.authClient.send({ cmd: 'get_users' }, {});
  }
}
