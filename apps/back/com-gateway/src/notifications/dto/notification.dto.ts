import { IsNotEmpty, IsString } from 'class-validator';

export class CreateNotificationDto {
    @IsNotEmpty()
    @IsString()
    titre: string;

    @IsNotEmpty()
    @IsString()
    content: string;
}