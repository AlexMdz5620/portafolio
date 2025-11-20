import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { In, Repository } from 'typeorm';
import { Tech } from '../tech/entities/tech.entity';
import { User } from '../user/entities/user.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    @InjectRepository(Tech)
    private readonly techRepository: Repository<Tech>,
  ) {}

  async create(createProjectDto: CreateProjectDto, user: User) {
    const techs = createProjectDto.techIds
      ? await this.techRepository.find({
          where: { id: In(createProjectDto.techIds) },
        })
      : [];

    const project = this.projectRepository.create({
      ...createProjectDto,
      user,
      techs,
    });

    await this.projectRepository.save(project);

    return { msg: 'Projecto creado correctamente.' };
  }

  async findAll(user: User) {
    return await this.projectRepository.find({
      where: { user: { id: user.id } },
      relations: ['techs'],
    });
  }

  async findOne(id: number, user: User) {
    const project = await this.projectRepository.findOne({
      where: { id, user: { id: user.id } },
      relations: ['techs'],
    });

    if (!project)
      throw new NotFoundException(`Projecto con el id ${id} no encontrado`);

    return project;
  }

  async update(id: number, updateProjectDto: UpdateProjectDto, user: User) {
    const project = await this.findOne(id, user);

    if (updateProjectDto.techIds) {
      // Traemos las tecnologías actuales y las nuevas seleccionadas
      const newTechs = updateProjectDto.techIds
        ? await this.techRepository.find({
            where: { id: In(updateProjectDto.techIds) },
          })
        : [];

      // Si quieres reemplazar totalmente el arreglo:
      project.techs = newTechs;

      // Si quieres solo agregar las que no existían (append):
      /*
    newTechs.forEach((tech) => {
      if (!project.techs.find((t) => t.id === tech.id)) {
        project.techs.push(tech);
      }
    });
    */
    }

    Object.assign(project, updateProjectDto);
    await this.projectRepository.save(project);

    return { msg: 'Proyecto actualizado correctamente.' };
  }

  async remove(id: number, user: User) {
    const project = await this.findOne(id, user);
    await this.projectRepository.remove(project);
    return {
      msg: `El proyecto "${project.title}" fue eliminado correctamente.`,
    };
  }

  async removeTech(proyectId: number, techId: number, user: User) {
    const project = await this.findOne(proyectId, user);

    const techIndex = project.techs.findIndex((tech) => tech.id === techId);
    if (techIndex === -1) {
      throw new NotFoundException(
        'La tecnología no está asociada a este proyecto.',
      );
    }

    project.techs.splice(techIndex, 1);

    await this.projectRepository.save(project);
    return { msg: 'Tecnología eliminada del proyecto correctamente.' };
  }
}
