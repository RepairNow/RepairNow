import { Controller, UsePipes, ValidationPipe, Inject, Body, UseGuards, Post, Get, Param, Patch, UseFilters, Delete } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { AuthGuard } from "../guards/auth.guard";
import { Observable } from "rxjs";
import { ExceptionFilter } from "../filters/rpc-exception.filter";

@Controller('announcements/:announcementId/estimates')
export class EstimatesController {
  constructor(@Inject('MISSION_SERVICE') private missionClient: ClientProxy) { }

  @Post()
  @UseGuards(AuthGuard)
  createEstimate(@Body() payload): Observable<any> {
    return this.missionClient.send({ cmd: "createEstimate" }, { ...payload });
  }

  @Get()
  @UseGuards(AuthGuard)
  findAll(@Param() params: { id: string }): Observable<any> {
    return this.missionClient.send({ cmd: "findAllEstimates" }, { ...params });
  }

  @Get('/:estimateId')
  @UseGuards(AuthGuard)
  findOne(@Param() params: { id: string, estimateId: string }): Observable<any> {
    return this.missionClient.send({ cmd: "findOneEstimate" }, { id: params.id, estimateId: params.estimateId });
  }

  @Patch('/:estimateId')
  @UseFilters(new ExceptionFilter())
  @UseGuards(AuthGuard)
  updateEstimate(@Body() payload): Observable<any> {
    return this.missionClient.send({ cmd: "updateEstimate" }, { ...payload });
  }

  @Delete('/:estimateId')
  @UseGuards(AuthGuard)
  remove(@Param() param: { id: string }): Observable<any> {
    return this.missionClient.send({ cmd: "removeEstimate" }, { id: param.id });
  }
}
