import { Catch, HttpException, ExceptionFilter } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

// allow us to not have ERROR 500 caused by ValidationPipe() in the api-gateway
@Catch(HttpException)
export class RpcValidationFilter implements ExceptionFilter {
  catch(exception: HttpException) {
    return new RpcException(exception.getResponse());
  }
}
