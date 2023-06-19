import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('jobs')
export class JobController {
    constructor(@Inject('JOB_SERVICE') private jobClient: ClientProxy) { }

    @UseGuards(AuthGuard)
    @Post()
    create(@Body() createJobDto: any) {
        return this.jobClient.send({ cmd: 'createJob' }, createJobDto);
    }

    @UseGuards(AuthGuard)
    @Get()
    findAll() {
        return this.jobClient.send({ cmd: 'findAllJobs' }, '');
    }

    @UseGuards(AuthGuard)
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.jobClient.send({ cmd: 'findOneJob' }, id);
    }

    @UseGuards(AuthGuard)
    @Patch()
    update(@Body() updateJobDto: any) {
        return this.jobClient.send({ cmd: 'updateJob' }, updateJobDto);
    }

    @UseGuards(AuthGuard)
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.jobClient.send({ cmd: 'removeJob' }, id);
    }
}
