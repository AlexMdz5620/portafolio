import { Module } from '@nestjs/common';
import { PublicService } from './public.service';
import { PublicController } from './public.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Project } from '../project/entities/project.entity';
import { Course } from '../course/entities/course.entity';
import { Tech } from '../tech/entities/tech.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Project, Course, Tech])],
  controllers: [PublicController],
  providers: [PublicService],
})
export class PublicModule {}
