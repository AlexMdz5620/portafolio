import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import type { AuthRequest } from '../auth/types/auth-request.interface';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadImageService } from 'src/upload-image/upload-image.service';

@Controller('courses')
@UseGuards(JwtAuthGuard)
export class CourseController {
  constructor(
    private readonly courseService: CourseService,
    private readonly uploadImageService: UploadImageService,
  ) {}

  @Post()
  create(@Body() createCourseDto: CreateCourseDto, @Req() req: AuthRequest) {
    return this.courseService.create(createCourseDto, req.user);
  }

  @Get()
  findAll(@Req() req: AuthRequest) {
    return this.courseService.findAll(req.user);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: AuthRequest) {
    return this.courseService.findOne(+id, req.user);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCourseDto: UpdateCourseDto,
    @Req() req: AuthRequest,
  ) {
    return this.courseService.update(+id, updateCourseDto, req.user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: AuthRequest) {
    return this.courseService.remove(+id, req.user);
  }

  @Post('upload-img')
  @UseInterceptors(
    FileInterceptor('file', {
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
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Req() req: AuthRequest,
  ) {
    if (!file) throw new BadRequestException('La imagen es obligatoria.');
    try {
      const folder = 'portafolio/courses';

      const res = await this.uploadImageService.uploadFile(file, folder);
      if ('secure_url' in res) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const secureUrl = res.secure_url;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        await this.courseService.update(+id, { img_url: secureUrl }, req.user);

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
