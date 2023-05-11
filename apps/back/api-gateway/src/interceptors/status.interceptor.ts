import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

@Injectable()
export class StatusInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((response) => {
        const httpResponse = context.switchToHttp().getResponse();

        // verify if "status" property exists in response
        if (response && response.hasOwnProperty('status')) {
          const { status } = response;

          // modify response status of the api-gateway
          httpResponse.status(status);
        }

        return response;
      }),
    );
  }
}
