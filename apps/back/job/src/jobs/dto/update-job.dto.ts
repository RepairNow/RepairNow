import { IsString, MaxLength, IsNotEmpty } from 'class-validator';

export class UpdateJobDto {
  @IsNotEmpty({ message: 'L\'id ne peut pas être vide' })
  @IsString({ message: 'L\'id doit être une chaîne de caractères' })
  id: string;

  @IsNotEmpty({ message: 'Le titre ne peut pas être vide' })
  @IsString({ message: 'Le titre doit être une chaîne de caractères' })
  @MaxLength(100, { message: 'Le titre ne peut pas dépasser 100 caractères' })
  title: string;
}
