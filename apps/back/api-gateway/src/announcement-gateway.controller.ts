import { Controller, UseInterceptors, Inject, Body, UseGuards, Post, Get, Param, Patch, UseFilters, Delete } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { AuthGuard } from "./guards/auth.guard";
import { Observable } from "rxjs";
import { ExceptionFilter } from "./filters/rpc-exception.filter";
import { StatusInterceptor } from "./interceptors/status.interceptor";

@Controller('/announcements')
export class AnnouncementsController {
  constructor(@Inject('MISSION_SERVICE') private missionClient: ClientProxy) { }

  @Post('')
  @UseGuards(AuthGuard)
  createAnnouncement(@Body() payload): Observable<any> {
    return this.missionClient.send({ cmd: "createAnnouncement" }, { ...payload });
  }

  @Get('')
  @UseGuards(AuthGuard)
  findAll(): Observable<any> {
    return this.missionClient.send({ cmd: "findAllAnnouncements" }, {});
  }

  @Get('/:id')
  @UseGuards(AuthGuard)
  findOne(@Param() param: { id: string }): Observable<any> {
    return this.missionClient.send({ cmd: "findOneAnnouncement" }, { id: param.id });
  }

  @Patch('/:id')
  @UseFilters(new ExceptionFilter())
  @UseGuards(AuthGuard)
  updateAnnouncement(@Param() param: { id: string }, @Body() payload): Observable<any> {
    try {
      return this.missionClient.send({ cmd: "updateAnnouncement" }, { id: param.id, ...payload });
    } catch (error) {
      return error.statusCode;
    }
  }

  @Delete('/:id')
  @UseGuards(AuthGuard)
  remove(@Param() param: { id: string }): Observable<any> {
    return this.missionClient.send({ cmd: "removeAnnouncement" }, { id: param.id });
  }
}
