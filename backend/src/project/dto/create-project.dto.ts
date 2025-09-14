import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsBoolean,
  IsArray,
  MaxLength,
  ArrayUnique,
  IsInt,
  IsUrl,
} from 'class-validator';

export class CreateProjectDto {
  @IsNotEmpty({ message: 'El nombre del proyecto no puede ir vacío.' })
  @IsString({ message: 'Valor no válido.' })
  @MaxLength(200)
  title: string;

  @IsOptional()
  @IsString({ message: 'Valor no válido.' })
  @MaxLength(500)
  img_url?: string;

  @IsUrl()
  @IsNotEmpty({ message: 'La URL de del repositorio no puede ir vacío.' })
  @IsString({ message: 'Valor no válido.' })
  @MaxLength(500)
  github_url: string;

  @IsUrl()
  @IsNotEmpty({ message: 'La URL del proyecto no puede ir vacío.' })
  @IsString({ message: 'Valor no válido.' })
  @MaxLength(500)
  demo_url: string;

  @IsNotEmpty({ message: 'El tipo del proyecto no puede ir vacío.' })
  @IsString({ message: 'Valor no válido.' })
  @MaxLength(60)
  type: string;

  @IsOptional()
  @IsBoolean()
  featured?: boolean;

  @IsOptional()
  @IsString({ message: 'Valor no válido.' })
  description?: string;

  @IsOptional()
  @IsArray()
  @ArrayUnique()
  @Type(() => Number)
  @IsInt({ each: true })
  techIds?: number[];
}
