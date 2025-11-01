import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
  MaxLength,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'El nombre del usuario no puede ir vacío.' })
  @IsString({ message: 'Valor no válido.' })
  @MaxLength(30)
  name: string;

  @IsNotEmpty({ message: 'El apellido no puede ir vacío .' })
  @IsString({ message: 'Valor no válido.' })
  @MaxLength(30)
  lastname: string;

  @IsNotEmpty({ message: 'El email no puede ir vacío.' })
  @IsEmail({}, { message: 'El correo electrónico no tiene un formato válido.' })
  @MaxLength(40)
  email: string;

  @IsOptional()
  @IsString({ message: 'Valor no válido.' })
  @MaxLength(500)
  photo_url?: string;

  @IsNotEmpty({ message: 'La contraseña es obligatória.' })
  @IsString({ message: 'Valor no válido.' })
  @MinLength(8)
  @MaxLength(255)
  password: string;
}
