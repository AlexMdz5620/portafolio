import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTechDto } from './dto/create-tech.dto';
import { UpdateTechDto } from './dto/update-tech.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tech } from './entities/tech.entity';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';

@Injectable()
export class TechService {
  constructor(
    @InjectRepository(Tech)
    private readonly techRepository: Repository<Tech>,
  ) {}

  async create(createTechDto: CreateTechDto, user: User) {
    const tech = this.techRepository.create({
      ...createTechDto,
      user,
    });

    await this.techRepository.save(tech);

    return { msg: 'Tecnología creada con éxito.' };
  }

  async findAll(user: User) {
    return await this.techRepository.find({
      where: { user: { id: user.id } },
      order: { created_at: 'DESC' },
    });
  }

  async findOne(id: number, user: User) {
    const tech = await this.techRepository.findOne({
      where: { id, user: { id: user.id } },
    });

    if (!tech)
      throw new NotFoundException(`Tecnología con el id ${id} no encontrada.`);

    return tech;
  }

  async update(id: number, updateTechDto: UpdateTechDto, user: User) {
    const tech = await this.findOne(id, user);
    Object.assign(tech, updateTechDto);
    await this.techRepository.save(tech);
    return { msg: 'Tecnología actualizada correctamente.' };
  }

  async remove(id: number, user: User) {
    const tech = await this.findOne(id, user);
    await this.techRepository.remove(tech);
    return {
      msg: `La tecnología ${tech.name} ha sido eliminada correctamente.`,
    };
  }
}
