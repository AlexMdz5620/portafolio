import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLinkDto } from './dto/create-link.dto';
import { UpdateLinkDto } from './dto/update-link.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Link } from './entities/link.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class LinkService {
  constructor(
    @InjectRepository(Link)
    private readonly linkRepository: Repository<Link>,
  ) {}

  async create(createLinkDto: CreateLinkDto, user: User) {
    const link = this.linkRepository.create({ ...createLinkDto, user });
    await this.linkRepository.save(link);
    return { msg: 'Link guardado exitosamente.' };
  }

  async findAll(user: User) {
    return await this.linkRepository.find({
      where: { user: { id: user.id } },
      order: { created_at: 'DESC' },
    });
  }

  async findOne(id: number, user: User) {
    const link = await this.linkRepository.findOne({
      where: { id, user: { id: user.id } },
    });
    if (!link) throw new NotFoundException(`El link con id ${id} no existe.`);
    return link;
  }

  async update(id: number, updateLinkDto: UpdateLinkDto, user: User) {
    const link = await this.findOne(id, user);
    Object.assign(link, updateLinkDto);
    await this.linkRepository.save(link);
    return { msg: 'Link actualizado correctamente.' };
  }

  async remove(id: number, user: User) {
    const link = await this.findOne(id, user);
    await this.linkRepository.remove(link);
    return {
      msg: `El link "${link.name}" ha sido eliminado correctamente.`,
    };
  }
}
