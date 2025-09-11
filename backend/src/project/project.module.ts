import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { UserModule } from '../user/user.module';
import { TechModule } from '../tech/tech.module';
import { Tech } from '../tech/entities/tech.entity';
import { UploadImageModule } from 'src/upload-image/upload-image.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Project, Tech]),
    UserModule,
    TechModule,
    UploadImageModule,
  ],
  controllers: [ProjectController],
  providers: [ProjectService],
  exports: [ProjectService],
})
export class ProjectModule {}
