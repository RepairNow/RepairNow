import { Controller, Get } from '@nestjs/common';
import { ComService } from './com.service';

@Controller()
export class ComController {
  constructor(private readonly comService: ComService) {}

  @Get()
  getHello(): string {
    return this.comService.getHello();
  }
}
