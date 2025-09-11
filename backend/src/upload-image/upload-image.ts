import { v2 as cloudinary } from 'cloudinary';

export const UploadImageCloudinary = {
  provide: 'CLOUDINARY',
  useFactory: () => {
    const cloudName = process.env.CLOUDINARY_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    if (!cloudName || !apiKey || !apiSecret) {
      throw new Error('Faltan variables de entorno de Cloudinary');
    }

    return cloudinary.config({
      cloud_name: cloudName,
      api_key: apiKey,
      api_secret: apiSecret,
    });
  },
};
