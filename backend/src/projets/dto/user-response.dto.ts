import { Expose } from 'class-transformer';

export class UserResponseDto {
  @Expose()
  id: number;

  @Expose()
  nom: string;

  @Expose()
  prenoms: string;

  @Expose()
  email: string;
}
