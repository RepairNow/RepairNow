import { PartialType } from '@nestjs/mapped-types';
import { CreateReviewDto } from './create-review.dto';
import { IsNotEmpty, IsUUID } from "class-validator";


export class UpdateReviewDto extends PartialType(CreateReviewDto) {
    @IsNotEmpty()
    @IsUUID()
    id: string;
}
