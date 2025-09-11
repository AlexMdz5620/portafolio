import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryResponse } from './upload-image.response';
import streamifier from 'streamifier';

@Injectable()
export class UploadImageService {
  uploadFile(file: Express.Multer.File, folder: string) {
    return new Promise<CloudinaryResponse>((res, rej) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder },
        (error, result) => {
          if (error)
            return rej(
              new InternalServerErrorException(
                error instanceof Error ? error.message : JSON.stringify(error),
              ),
            );
          if (!result) return rej(new Error('No response from Cloudinary'));
          return res(result);
        },
      );
      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });
  }
}
