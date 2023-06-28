import { Controller, Get } from '@nestjs/common';
import { ComService } from './com.service';

@Controller()
export class ComController {
  constructor(private readonly comService: ComService) { }

  // Needed for k8s - Don't touch !!!
  @Get()
  health() {
    return true;
  }

  @Get()
  getHello(): string {
    return this.comService.getHello();
  }
}
