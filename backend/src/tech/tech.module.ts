import { Module } from '@nestjs/common';
import { TechService } from './tech.service';
import { TechsController } from './tech.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tech } from './entities/tech.entity';
import { UserModule } from '../user/user.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Tech]), UserModule, AuthModule],
  controllers: [TechsController],
  providers: [TechService],
  exports: [TechService],
})
export class TechModule {}
