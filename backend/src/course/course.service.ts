import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from './entities/course.entity';
import { User } from '../user/entities/user.entity';
// import { Project } from '../project/entities/project.entity';
// import { Tech } from '../tech/entities/tech.entity';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
    // @InjectRepository(Project)
    // private readonly projectRepository: Repository<Project>,
    // @InjectRepository(Tech)
    // private readonly techRepository: Repository<Tech>,
  ) {}

  async create(createCourseDto: CreateCourseDto, user: User) {
    const course = this.courseRepository.create({
      ...createCourseDto,
      user,
    });
    await this.courseRepository.save(course);
    return { msg: 'Curso creado con éxito.' };
  }

  async findAll(user: User) {
    return await this.courseRepository.find({
      where: { user: { id: user.id } },
      order: { created_at: 'DESC' },
    });
  }

  async findOne(id: number, user: User) {
    const course = await this.courseRepository.findOne({
      where: { id, user: { id: user.id } },
    });
    if (!course)
      throw new NotFoundException(`El curso con id ${id} no encontrado.`);
    return course;
  }

  async update(id: number, updateCourseDto: UpdateCourseDto, user: User) {
    const course = await this.findOne(id, user);
    Object.assign(course, updateCourseDto);
    await this.courseRepository.save(course);
    return { msg: 'Curso actualizado correctamente.' };
  }

  async remove(id: number, user: User) {
    const course = await this.findOne(id, user);
    await this.courseRepository.remove(course);
    return {
      msg: `El curso "${course.title}" ha sido eliminado correctamente.`,
    };
  }
}
