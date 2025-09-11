import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UsersController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UploadImageModule } from 'src/upload-image/upload-image.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), UploadImageModule],
  controllers: [UsersController],
  providers: [UserService],
  exports: [UserService, TypeOrmModule],
})
export class UserModule {}
