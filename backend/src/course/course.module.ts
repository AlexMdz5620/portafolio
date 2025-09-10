import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { UserModule } from '../user/user.module';
import { ProjectModule } from '../project/project.module';
import { TechModule } from '../tech/tech.module';
import { Project } from '../project/entities/project.entity';
import { Tech } from '../tech/entities/tech.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Course, Project, Tech]),
    UserModule,
    ProjectModule,
    TechModule,
  ],
  controllers: [CourseController],
  providers: [CourseService],
})
export class CourseModule {}
