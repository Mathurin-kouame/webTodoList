import { IsEmail, IsNotEmpty } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  nom: string;

  @IsNotEmpty()
  prenoms: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
