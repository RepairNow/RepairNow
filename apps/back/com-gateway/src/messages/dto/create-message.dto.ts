import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMessageDto {
  @IsNotEmpty()
  @IsString()
  conversation_id: string;

  @IsNotEmpty()
  @IsString()
  sender_id: string;

  @IsNotEmpty()
  @IsString()
  message: string;
}

export class CreateMessageDtoBody {
  @IsNotEmpty()
  @IsString()
  conversation_id: string;

  @IsNotEmpty()
  @IsString()
  message: string;
}
