import { IsNotEmpty, IsString } from 'class-validator';

export class VerifyDto {
  @IsString({ message: 'Valor no válido.' })
  @IsNotEmpty({ message: 'La contraseña no puede ir vacío.' })
  password: string;
}
