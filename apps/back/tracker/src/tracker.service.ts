import { Injectable } from '@nestjs/common';

@Injectable()
export class TrackerService {
  getHello(): string {
    return 'Hello World! from tracker';
  }
}
