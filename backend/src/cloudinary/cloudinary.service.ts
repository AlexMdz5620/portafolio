import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CloudinaryService {
  constructor(private configService: ConfigService) {
    // Configuración básica - aunque para delete necesitas las credenciales
    cloudinary.config({
      cloud_name: this.configService.get('CLOUDINARY_NAME'),
      api_key: this.configService.get('CLOUDINARY_API_KEY'),
      api_secret: this.configService.get('CLOUDINARY_API_SECRET'),
    });
  }

  async deleteImage(publicId: string): Promise<void> {
    try {
      await cloudinary.uploader.destroy(publicId);
      console.log(`Imagen ${publicId} eliminada de Cloudinary`);
    } catch (error) {
      console.error('Error deleting image from Cloudinary:', error);
      // No lanzamos error para no romper el flujo principal
    }
  }

  extractPublicIdFromUrl(secureUrl: string): string {
    // Ejemplo: https://res.cloudinary.com/dwx3oktt9/image/upload/v1234567/portafolio/courses/abc123.jpg
    // Extrae: portafolio/courses/abc123

    const urlParts = secureUrl.split('/');
    const uploadIndex = urlParts.indexOf('upload');

    if (uploadIndex === -1) {
      throw new Error('Invalid Cloudinary URL');
    }

    // Tomar todo después de 'upload/v1234567/'
    const pathParts = urlParts.slice(uploadIndex + 2);
    const fullPath = pathParts.join('/');

    // Remover la extensión del archivo
    return fullPath.replace(/\.[^/.]+$/, '');
  }
}
