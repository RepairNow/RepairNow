import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignWithEmailDto {
    @ApiProperty({ type: String, example: 'john@gmail.com' })
    @IsEmail()
    email: string;

    @ApiProperty({ type: String, example: 'my password' })
    @IsNotEmpty()
    @IsString()
    password: string;
}