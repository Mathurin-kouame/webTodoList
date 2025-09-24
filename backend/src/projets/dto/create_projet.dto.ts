import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateProjetDto {
  @IsNotEmpty()
  titre: string;

  @IsOptional()
  description?: string;
}
