import { IsNotEmpty, IsArray } from 'class-validator';
export class CreateConversationtDto {
  @IsNotEmpty()
  @IsArray()
  members: Array<object>;
}
