import { Body, Controller, UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { RpcValidationFilter } from './filters/rpc-validation.filter';

@Controller()
export class JobsController {
  constructor(private readonly jobsService: JobsService) { }

  @UseFilters(new RpcValidationFilter())
  @MessagePattern({ cmd: 'createJob' })
  @UsePipes(new ValidationPipe())
  create(@Payload(ValidationPipe) createJobDto: CreateJobDto) {
    return this.jobsService.create(createJobDto);
  }

  @UseFilters(new RpcValidationFilter())
  @MessagePattern({ cmd: 'findAllJobs' })
  findAll() {
    return this.jobsService.findAll();
  }

  @UseFilters(new RpcValidationFilter())
  @MessagePattern({ cmd: 'findOneJob' })
  findOne(@Payload() id: string) {
    return this.jobsService.findOne(id);
  }

  @UseFilters(new RpcValidationFilter())
  @MessagePattern({ cmd: 'updateJob' })
  update(@Payload() updateJobDto: UpdateJobDto) {
    return this.jobsService.update(updateJobDto);
  }

  @MessagePattern({ cmd: 'removeJob' })
  remove(@Payload() id: string) {
    return this.jobsService.remove(id);
  }
}
