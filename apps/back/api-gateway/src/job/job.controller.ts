import { Body, Controller, Delete, Get, Inject, Param, Patch, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('jobs')
export class JobController {
    constructor(@Inject('JOB_SERVICE') private jobClient: ClientProxy) { }

    @Post()
    create(@Body() createJobDto: any) {
        return this.jobClient.send({ cmd: 'createJob' }, createJobDto);
    }

    @Get()
    findAll() {
        return this.jobClient.send({ cmd: 'findAllJobs' }, '');
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.jobClient.send({ cmd: 'findOneJob' }, id);
    }

    @Patch()
    update(@Body() updateJobDto: any) {
        return this.jobClient.send({ cmd: 'updateJob' }, updateJobDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.jobClient.send({ cmd: 'removeJob' }, id);
    }
}
