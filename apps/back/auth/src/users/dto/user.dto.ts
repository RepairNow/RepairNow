import { IsNotEmpty, IsEmail, IsString, IsBoolean } from 'class-validator';

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
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  phoneNumber: string;

  @IsNotEmpty()
  @IsString()
  firstname: string;

  @IsNotEmpty()
  @IsString()
  lastname: string;

  birthdate?: Date;

  @IsBoolean()
  isContractorRoleAsked?: boolean;
}

export class UpdateUserDto {
  phoneNumber?: string;
  firstname?: string;
  lastname?: string;
  birthdate?: Date;
  refreshToken?: string;
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
