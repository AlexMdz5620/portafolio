import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateDescriptionDto } from './dto/create-description.dto';
import { UpdateDescriptionDto } from './dto/update-description.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Description } from './entities/description.entity';
import { DescriptionType } from '../enums/description-type.enum';
import { User } from '../user/entities/user.entity';

@Injectable()
export class DescriptionService {
  constructor(
    @InjectRepository(Description)
    private readonly descriptionRepository: Repository<Description>,
  ) {}

  async create(createDescriptionDto: CreateDescriptionDto, user: User) {
    if (createDescriptionDto.type === DescriptionType.MAIN) {
      const existingMain = await this.descriptionRepository.findOne({
        where: {
          user: { id: user.id },
          type: DescriptionType.MAIN,
        },
      });

      if (existingMain) {
        throw new ConflictException(
          'Ya existe una descripción principal para este usuario.',
        );
      }
    }

    const description = this.descriptionRepository.create({
      ...createDescriptionDto,
      user,
    });

    await this.descriptionRepository.save(description);
    return { msg: 'Descripción creada correctamente.' };
  }

  async findAll(user: User) {
    return await this.descriptionRepository.find({
      where: {
        user: { id: user.id },
      },
    });
  }

  async findOne(id: number, user: User) {
    const description = await this.descriptionRepository.findOne({
      where: { id, user: { id: user.id } },
    });

    if (!description) {
      throw new NotFoundException(`La descripción con el id ${id} no existe.`);
    }

    return description;
  }

  async update(
    id: number,
    updateDescriptionDto: UpdateDescriptionDto,
    user: User,
  ) {
    const description = await this.findOne(id, user);

    if (
      updateDescriptionDto.type === DescriptionType.MAIN &&
      description.type !== DescriptionType.MAIN
    ) {
      const existingMain = await this.descriptionRepository.findOne({
        where: {
          user: { id: user.id },
          type: DescriptionType.MAIN,
        },
      });

      if (existingMain && existingMain.id !== id) {
        throw new ConflictException(
          'Ya existe una descripción principal para este usuario',
        );
      }
    }

    Object.assign(description, updateDescriptionDto);
    await this.descriptionRepository.save(description);
    return {
      msg: `La descripción ha sido actualizada correctamente.`,
    };
  }

  async remove(id: number, user: User) {
    const description = await this.findOne(id, user);
    await this.descriptionRepository.remove(description);
    return {
      msg: `La descripción "${description.name || 'sin nombre'}" ha sido eliminada correctamente.`,
    };
  }
}
