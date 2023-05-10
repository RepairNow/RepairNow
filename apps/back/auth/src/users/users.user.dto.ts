import { IsNotEmpty } from 'class-validator';

enum ERole {
  ADMIN = 'ADMIN',
  CLIENT = 'CLIENT',
  PRO = 'PRO',
}

export class LoginUserDto {
  @IsNotEmpty()
  readonly email: string;

  @IsNotEmpty()
  readonly password: string;
}

export class CreateUserDto {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;

  avatar: string;
  phoneNumber: string;
  firstname: string;
  lastname: string;
  birthdate: Date;
}
export class UpdateUserDto {
  avatar: string;
  phoneNumber: string;
  firstname: string;
  lastname: string;
  birthdate: Date;
}

export class ChangeRoleDto {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  role: ERole;
}

export class UpdatePasswordDto {
  @IsNotEmpty()
  new_password: string;

  @IsNotEmpty()
  old_password: string;
}
