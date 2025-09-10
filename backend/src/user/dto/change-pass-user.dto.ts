import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class ChangePasswordDto {
  @IsString({ message: 'Valor no válido.' })
  @IsNotEmpty({ message: 'La contraseña no puede ir vacía.' })
  password: string;

  @IsString({ message: 'Valor no válido.' })
  @IsNotEmpty({ message: 'La contraseña no puede ir vacía' })
  @MinLength(8, { message: 'Contraseña demasiado corta.' })
  new_password: string;
}
