import {Body, Controller, Delete, Get, Query, Inject, Param, Patch, Post, Request, UseGuards} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AuthGuard } from 'src/guards/auth.guard';
import {Observable} from "rxjs";

@Controller('missions')
@UseGuards(AuthGuard)
export class MissionController {
    constructor(@Inject('MISSION_SERVICE') private missionClient: ClientProxy) { }

    @Post()
    create(@Body() createMissionDto: any) {
        return this.missionClient.send({ cmd: 'createMission' }, createMissionDto);
    }

    // @Get()
    // findAll() {
    //     return this.missionClient.send({ cmd: 'findAllMission' }, '');
    // }

    @Get('/my-missions')
    findUserMissions(@Request() request, @Query() query) {
        const { user } = request;
        const { status } = query;
        return this.missionClient.send({ cmd: 'findUserMissions' }, { user: user, status: status ? status : null });
    }

    @Get('/:id')
    findOne(@Param() param: { id: string }): Observable<any> {
        return this.missionClient.send({ cmd: "findOneMission" }, { id: param.id });
    }

    @Patch()
    update(@Param('announcementId') id: string, @Body() updateMissionDto: any) {
        return this.missionClient.send({ cmd: 'updateMission' }, updateMissionDto);
    }

    @Delete('/:id')
    remove(@Param('id') id: string) {
        return this.missionClient.send({ cmd: 'removeMission' }, id);
    }
}
