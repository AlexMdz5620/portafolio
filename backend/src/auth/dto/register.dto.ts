import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RegisterDto {
  @IsString({ message: 'Valor no válido.' })
  @IsNotEmpty({ message: 'El nombre no puede ir vacío.' })
  @MaxLength(30)
  name: string;

  @IsString({ message: 'Valor no válido.' })
  @IsNotEmpty({ message: 'El apellido no puede ir vacío.' })
  @MaxLength(30)
  lastname: string;

  @IsEmail({}, { message: 'Email no válido.' })
  @IsNotEmpty({ message: 'El correo electrónico no puede ir vacío.' })
  @MaxLength(40)
  email: string;

  @IsOptional()
  @IsString({ message: 'Valor no válido.' })
  @MaxLength(500)
  photo_url?: string;

  @IsOptional()
  @IsString({ message: 'Valor no válido.' })
  description_1?: string;

  @IsOptional()
  @IsString({ message: 'Valor no válido.' })
  description_2?: string;

  @IsString({ message: 'Valor no válido.' })
  @IsNotEmpty({ message: 'LA contraseña no puede ir vacía.' })
  @MinLength(8)
  password: string;
}
