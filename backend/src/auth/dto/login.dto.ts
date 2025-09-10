import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'Email no válido.' })
  @IsNotEmpty({ message: 'El email no puede ir vacío.' })
  email: string;

  @IsString({ message: 'Valor no válido.' })
  @IsNotEmpty({ message: 'El email no puede ir vacío.' })
  password: string;
}
