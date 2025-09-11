import {
  Controller,
  Get,
  Body,
  Patch,
  Req,
  UseGuards,
  Post,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ChangePasswordDto } from './dto/change-pass-user.dto';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import type { AuthRequest } from '../auth/types/auth-request.interface';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadImageService } from '../upload-image/upload-image.service';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(
    private readonly userService: UserService,
    private readonly uploadImageService: UploadImageService,
  ) {}

  @Get('me')
  findOne(@Req() req: AuthRequest) {
    return this.userService.findOne(req.user.id);
  }

  @Patch('me')
  update(@Req() req: AuthRequest, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(req.user.id, updateUserDto);
  }

  @Patch('me/password')
  changePassword(
    @Req() req: AuthRequest,
    @Body() changePassword: ChangePasswordDto,
  ) {
    return this.userService.changePassword(req.user.id, changePassword);
  }

  @Post('upload-photo')
  @UseInterceptors(
    FileInterceptor('file', {
      // limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
      fileFilter: (req, file, cb) => {
        // Aceptar solo imágenes jpg/jpeg/png
        if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
          return cb(
            new Error('Solo se permiten imágenes (jpg, jpeg, png)'),
            false,
          );
        }
        cb(null, true);
      },
    }),
  )
  async uploadPhoto(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: AuthRequest,
  ) {
    if (!file) {
      throw new BadRequestException('La foto es obligatoria.');
    }
    try {
      const folder = 'portafolio/profile';

      const userId = req.user.id;
      const res = await this.uploadImageService.uploadFile(file, folder);
      if ('secure_url' in res) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const secureUrl = res.secure_url;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        await this.userService.update(userId, { photo_url: secureUrl });

        return {
          msg: 'Foto de perfil actualizada correctamente.',
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          url: secureUrl,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          public_id: res.public_id,
        };
      }

      throw new BadRequestException('Error en Cloudinary');
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Error del servidor.');
    }
  }
}
