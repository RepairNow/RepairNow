import { IsNotEmpty, IsUUID, IsString, IsDate } from "class-validator"

export class CreateFileDto {
  @IsNotEmpty()
  @IsString()
  fieldname: string

  @IsNotEmpty()
  @IsString()
  filename: string

  @IsNotEmpty()
  @IsString()
  encoding: string

  @IsNotEmpty()
  @IsString()
  destination: string

  @IsNotEmpty()
  @IsString()
  path: string

  @IsNotEmpty()
  @IsString()
  originalname: string

  @IsNotEmpty()
  @IsString()
  mimetype: string
  
  @IsNotEmpty()
  size: Number
}
