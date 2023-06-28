import { Controller, UsePipes, ValidationPipe, UseFilters } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { EstimatesService } from './estimates.service';
import { CreateEstimateDto } from './dto/create-estimate.dto';
import { UpdateEstimateDto } from './dto/update-estimate.dto';
import { RpcValidationFilter } from 'src/filters/rpc-validation.filter';
@Controller()
export class EstimatesController {
  constructor(private readonly estimatesService: EstimatesService) { }

  @MessagePattern({ cmd: 'createEstimate' })
  @UsePipes(new ValidationPipe())
  @UseFilters(new RpcValidationFilter())
  create(@Payload(ValidationPipe) createEstimateDto: CreateEstimateDto) {
    return this.estimatesService.create(createEstimateDto);
  }

  @MessagePattern({ cmd: 'findAllEstimates' })
  findAll(@Payload() id: string) {
    return this.estimatesService.findAll(id);
  }

  @MessagePattern({ cmd: 'findOneEstimate' })
  findOne(@Payload() payload: { announcementId: string, estimateId: string }) {
    return this.estimatesService.findOne(payload);
  }

  @MessagePattern({ cmd: 'updateEstimate' })
  @UsePipes(new ValidationPipe())
  update(@Payload(ValidationPipe) updateEstimateDto: UpdateEstimateDto) {
    return this.estimatesService.update(updateEstimateDto);
  }

  @MessagePattern({ cmd: 'acceptEstimate' })
  acceptEstimate(@Payload(ValidationPipe) payload: { announcementId: string, estimateId: string }) {
    return this.estimatesService.acceptEstimate(payload);
  }

  @MessagePattern({ cmd: 'removeEstimate' })
  remove(@Payload() payload: { id: string, estimateId: string }) {
    return this.estimatesService.remove(payload);
  }
}
