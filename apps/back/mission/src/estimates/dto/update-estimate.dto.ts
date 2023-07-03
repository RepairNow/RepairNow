import { PartialType } from '@nestjs/mapped-types';
import { CreateEstimateDto } from './create-estimate.dto';
import { IsNotEmpty, IsUUID, IsIn, IsDate } from "class-validator"
export class UpdateEstimateDto extends PartialType(CreateEstimateDto) {
  price: number
  description: string
  images: string[]
  @IsIn(["ACCEPTED", "PENDING", "REFUSED"])
  currentStatus: string
}
