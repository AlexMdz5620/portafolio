import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { UserModule } from '../user/user.module';
import { TechModule } from '../tech/tech.module';
import { Tech } from '../tech/entities/tech.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Project, Tech]), UserModule, TechModule],
  controllers: [ProjectController],
  providers: [ProjectService],
  exports: [ProjectService],
})
export class ProjectModule {}
