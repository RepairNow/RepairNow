import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('missions')
export class MissionController {
    constructor(@Inject('MISSION_SERVICE') private missionClient: ClientProxy) { }

    @UseGuards(AuthGuard)
    @Post()
    create(@Body() createMissionDto: any) {
        return this.missionClient.send({ cmd: 'createMission' }, createMissionDto);
    }

    @UseGuards(AuthGuard)
    @Get()
    findAll() {
        return this.missionClient.send({ cmd: 'findAllMission' }, '');
    }

    @UseGuards(AuthGuard)
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.missionClient.send({ cmd: 'findOneMission' }, id);
    }

    @UseGuards(AuthGuard)
    @Patch()
    update(@Body() updateMissionDto: any) {
        return this.missionClient.send({ cmd: 'updateMission' }, updateMissionDto);
    }

    @UseGuards(AuthGuard)
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.missionClient.send({ cmd: 'removeMission' }, id);
    }
}