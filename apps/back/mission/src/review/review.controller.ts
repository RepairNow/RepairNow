import { Controller, UseFilters, ValidationPipe } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { RpcValidationFilter } from 'src/filters/rpc-validation.filter';

@Controller()
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) { }

  @MessagePattern({ cmd: 'createReview' })
  @UseFilters(RpcValidationFilter)
  create(@Payload(ValidationPipe) createReviewDto: CreateReviewDto) {
    return this.reviewService.create(createReviewDto);
  }

  @MessagePattern({ cmd: 'findAllReview' })
  findAll() {
    return this.reviewService.findAll();
  }

  @MessagePattern({ cmd: 'findOneReview' })
  findOne(@Payload() id: string) {
    return this.reviewService.findOne(id);
  }

  @MessagePattern({ cmd: 'updateReview' })
  @UseFilters(RpcValidationFilter)
  update(@Payload(ValidationPipe) updateReviewDto: UpdateReviewDto) {
    return this.reviewService.update(updateReviewDto);
  }

  @MessagePattern({ cmd: 'removeReview' })
  remove(@Payload() id: string) {
    return this.reviewService.remove(id);
  }
}
