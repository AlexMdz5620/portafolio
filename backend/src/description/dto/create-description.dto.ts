import { Injectable } from '@nestjs/common';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { DescriptionType } from 'src/enums/description-type.enum';

@Injectable()
export class CreateDescriptionDto {
  @IsEnum(DescriptionType)
  type: DescriptionType;

  @IsOptional()
  @IsString()
  @MaxLength(60)
  name?: string;

  @IsNotEmpty({ message: 'El contenido no puede ir vacío.' })
  @IsString({ message: 'Valon no válido.' })
  content: string;
}
