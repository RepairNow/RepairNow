import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Injectable()
export class ApiGatewayService {
  constructor(
    @Inject('AUTH_SERVICE') private authClient: ClientProxy,
  ) { }

  callAuth(): Observable<string> {
    return this.authClient.send({ cmd: 'call_auth' }, {});
  }
  getHello(): string {
    return 'Hello World!';
  }
}
