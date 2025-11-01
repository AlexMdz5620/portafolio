import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { Project } from '../project/entities/project.entity';
import { Course } from '../course/entities/course.entity';
import { Tech } from '../tech/entities/tech.entity';

@Injectable()
export class PublicService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
    @InjectRepository(Tech)
    private readonly techRepository: Repository<Tech>,
  ) {}

  async getProfile(userId: number) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['links', 'descriptions'],
    });
    if (!user) throw new NotFoundException('Perfil no encontrado');
    return {
      name: user.name,
      lastname: user.lastname,
      email: user.email,
      photo_url: user.photo_url,
      links: user.links,
      descriptions: user.descriptions,
    };
  }

  async getProjects(userId: number) {
    return this.projectRepository.find({
      where: { user: { id: userId } },
    });
  }

  async getCourses(userId: number) {
    return this.courseRepository.find({
      where: { user: { id: userId } },
    });
  }

  async getTechs(userId: number) {
    return this.techRepository.find({
      where: { user: { id: userId } },
    });
  }
}
