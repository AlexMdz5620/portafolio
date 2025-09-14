import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectModule } from './project/project.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { UserModule } from './user/user.module';
import { CourseModule } from './course/course.module';
import { TechModule } from './tech/tech.module';
import { AuthModule } from './auth/auth.module';
import { PublicModule } from './public/public.module';
import { UploadImageModule } from './upload-image/upload-image.module';
import { LinkModule } from './link/link.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useFactory: typeOrmConfig,
      inject: [ConfigService],
    }),
    ProjectModule,
    UserModule,
    CourseModule,
    TechModule,
    AuthModule,
    PublicModule,
    UploadImageModule,
    LinkModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
