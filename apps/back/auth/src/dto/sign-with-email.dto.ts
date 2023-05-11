import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignWithEmailDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
