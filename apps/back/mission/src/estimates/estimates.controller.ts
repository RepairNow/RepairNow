import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { EstimatesService } from './estimates.service';
import { CreateEstimateDto } from './dto/create-estimate.dto';
import { UpdateEstimateDto } from './dto/update-estimate.dto';

@Controller()
export class EstimatesController {
  constructor(private readonly estimatesService: EstimatesService) {}

  @MessagePattern('createEstimate')
  create(@Payload() createEstimateDto: CreateEstimateDto) {
    return this.estimatesService.create(createEstimateDto);
  }

  @MessagePattern('findAllEstimates')
  findAll() {
    return this.estimatesService.findAll();
  }

  @MessagePattern('findOneEstimate')
  findOne(@Payload() id: number) {
    return this.estimatesService.findOne(id);
  }

  @MessagePattern('updateEstimate')
  update(@Payload() updateEstimateDto: UpdateEstimateDto) {
    return this.estimatesService.update(updateEstimateDto.id, updateEstimateDto);
  }

  @MessagePattern('removeEstimate')
  remove(@Payload() id: number) {
    return this.estimatesService.remove(id);
  }
}
