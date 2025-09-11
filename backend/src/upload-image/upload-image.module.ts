import { Module } from '@nestjs/common';
import { UploadImageService } from './upload-image.service';
import { UploadImageCloudinary } from './upload-image';

@Module({
  providers: [UploadImageService, UploadImageCloudinary],
  exports: [UploadImageService],
})
export class UploadImageModule {}
