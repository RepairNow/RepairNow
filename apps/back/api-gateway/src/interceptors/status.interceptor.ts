import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

@Injectable()
export class StatusInterceptor implements NestInterceptor {
  // this interceptor is usefull to modify the response status of the api-gateway
  // exemple: if the auth service return a 401 status, the api-gateway will return a 401 status too (not a 201 status for exemple)
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((response) => {
        const httpResponse = context.switchToHttp().getResponse();
        // change status if received a rpc exception
        if (response.error && response.error.hasOwnProperty('statusCode')) {
          const { statusCode } = response.error;

          // modify response status of the api-gateway
          httpResponse.status(statusCode);
          return response.error;
        }

        // change status if received a Nest built in exception (BadRequestException, NotFoundException, etc...)
        if (response.status && response.status.toString().match(/^[45]/)) {
          // modify response status of the api-gateway
          httpResponse.status(response.status);
        }

        return response;
      }),
    );
  }
}
