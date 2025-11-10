import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateCourseDto {
  @IsNotEmpty({ message: 'El nombre del curso es obligatorio.' })
  @IsString({ message: 'Valor no válido.' })
  @MaxLength(200)
  title: string;

  @IsNotEmpty({ message: 'La institución es obligatoria.' })
  @IsString({ message: 'Valor no válido.' })
  @MaxLength(200)
  institute?: string;

  @IsOptional()
  @IsString({ message: 'Valor no válido.' })
  @MaxLength(500)
  img_url?: string;

  @IsOptional()
  @IsString({ message: 'Valor no válido.' })
  description?: string;

  @IsNotEmpty({ message: 'La fecha de finalización es obligatoria.' })
  @IsDateString()
  complete_date?: Date;
}
