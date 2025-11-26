import { Module } from '@nestjs/common';
import { DescriptionService } from './description.service';
import { DescriptionController } from './description.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Description } from './entities/description.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Description]), AuthModule],
  controllers: [DescriptionController],
  providers: [DescriptionService],
})
export class DescriptionModule {}
