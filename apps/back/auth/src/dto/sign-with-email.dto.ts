import { IsEmail, IsNotEmpty } from 'class-validator';

export class SignWithEmailDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
