import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateTechDto {
  @IsNotEmpty({ message: 'El nombre de la tecnología no puede ir vacío.' })
  @IsString({ message: 'Valor no válido.' })
  @MaxLength(100)
  name: string;

  @IsOptional()
  @IsString({ message: 'Valor no válido.' })
  @MaxLength(60)
  mastery_level?: string;

  @IsNotEmpty({ message: 'La categoría de la tecnología no puede ir vacía.' })
  @IsString({ message: 'Valor no válido.' })
  @MaxLength(100)
  category: string;
}
