import { IsNotEmpty, IsNumber } from "class-validator";
export class ValicationCodeDto {
  @IsNotEmpty()
  @IsNumber()
  code: number;
}
