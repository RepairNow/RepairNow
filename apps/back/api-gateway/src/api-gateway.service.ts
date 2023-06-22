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

  signUp(email: string, password: string): Observable<string> {
    return this.authClient.send(
      { cmd: 'sign_up_email' },
      {
        email,
        password,
      },
    );
  }

  getUsers(): Observable<any> {
    return this.authClient.send({ cmd: 'get_users' }, {});
  }
}
