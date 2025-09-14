import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateLinkDto {
  @IsNotEmpty({ message: 'El nombre del link es obligatorio.' })
  @IsString({ message: 'Valor no válido.' })
  @MaxLength(60)
  name: string;

  @IsNotEmpty({ message: 'El link es obligatorio.' })
  @IsString({ message: 'Valor no válido.' })
  @MaxLength(200)
  link: string;

  @IsOptional()
  @IsBoolean({ message: 'Valor no válido.' })
  active?: boolean;
}
