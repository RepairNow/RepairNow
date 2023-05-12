import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
// This logging interceptor can be used to log the time taken by each request.
// Maybe we can use it to push some logs to our tracker back stack?
// => to log all backend requests and send it to our backend for analytics

// exemple of custom interceptor.
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before...');

    const now = Date.now();
    return (
      next
        .handle()
        // it only make a console log of the time taken by the request
        .pipe(tap(() => console.log(`After... ${Date.now() - now}ms`)))
    );
  }
}
