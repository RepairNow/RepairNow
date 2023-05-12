import { Controller } from '@nestjs/common';
import { TrackerService } from './tracker.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class TrackerController {
  constructor(private readonly trackerService: TrackerService) {}

  @MessagePattern({ cmd: 'get_hello_tracker' })
  getHello(): string {
    return this.trackerService.getHello();
  }

  @MessagePattern({ cmd: 'accumulate' })
  accumulate(data: number[]): number {
    return (data || []).reduce((a, b) => a + b);
  }
}
