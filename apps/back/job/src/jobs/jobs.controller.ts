import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';

@Controller()
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @MessagePattern('createJob')
  create(@Payload() createJobDto: CreateJobDto) {
    return this.jobsService.create(createJobDto);
  }

  @MessagePattern('findAllJobs')
  findAll() {
    return this.jobsService.findAll();
  }

  @MessagePattern('findOneJob')
  findOne(@Payload() id: number) {
    return this.jobsService.findOne(id);
  }

  @MessagePattern('updateJob')
  update(@Payload() updateJobDto: UpdateJobDto) {
    return this.jobsService.update(updateJobDto.id, updateJobDto);
  }

  @MessagePattern('removeJob')
  remove(@Payload() id: number) {
    return this.jobsService.remove(id);
  }
}
