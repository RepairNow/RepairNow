import { IsNotEmpty, IsArray, IsString } from 'class-validator';
export class CreateConversationtDto {
  @IsNotEmpty()
  @IsArray()
  members: Array<object>;

  @IsNotEmpty()
  @IsString()
  announcementId: string;
}
