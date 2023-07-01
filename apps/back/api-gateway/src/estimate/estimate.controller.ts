import {
  Controller,
  UsePipes,
  ValidationPipe,
  Inject,
  Body,
  UseGuards,
  Post,
  Get,
  Param,
  Patch,
  UseFilters,
  Delete,
  Req, Request
} from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { AuthGuard } from "../guards/auth.guard";
import { Observable } from "rxjs";
import { ExceptionFilter } from "../filters/rpc-exception.filter";

@Controller('announcements/:announcementId/estimates')
export class EstimatesController {
  constructor(@Inject('MISSION_SERVICE') private missionClient: ClientProxy) { }

  @Post()
  @UseGuards(AuthGuard)
  createEstimate(
      @Request() request,
      @Param('announcementId') announcementId: string,
      @Body() createEstimateDto: any
  ): Observable<any> {
    const { user } = request;
    return this.missionClient.send({ cmd: "createEstimate" }, {createEstimateDto: createEstimateDto, announcementId: announcementId, user: user});
  }

  @Get()
  @UseGuards(AuthGuard)
  findAll(@Param('announcementId') id: string): Observable<any> {
    return this.missionClient.send({ cmd: "findAllEstimates" }, id);
  }

  @Get('/:estimateId')
  @UseGuards(AuthGuard)
  findOne(@Param() params: { announcementId: string, estimateId: string }): Observable<any> {
    return this.missionClient.send({ cmd: "findOneEstimate" }, { announcementId: params.announcementId, estimateId: params.estimateId });
  }

  @Patch('/:estimateId')
  @UseFilters(new ExceptionFilter())
  @UseGuards(AuthGuard)
  updateEstimate(@Param() params: { announcementId: string, estimateId: string },@Body() updateEstimateDto: any): Observable<any> {
    return this.missionClient.send({ cmd: "updateEstimate" }, { updateEstimateDto: updateEstimateDto, announcementId: params.announcementId, estimateId: params.estimateId});
  }

  @Patch('/:estimateId/accept_estimate')
  @UseFilters(new ExceptionFilter())
  @UseGuards(AuthGuard)
  acceptEstimate(@Param() params: { announcementId: string, estimateId: string }): Observable<any> {
    return this.missionClient.send({ cmd: "acceptEstimate" }, params);
  }

  @Delete('/:estimateId')
  @UseGuards(AuthGuard)
  remove(@Param() param: { id: string }): Observable<any> {
    return this.missionClient.send({ cmd: "removeEstimate" }, { id: param.id });
  }
}
