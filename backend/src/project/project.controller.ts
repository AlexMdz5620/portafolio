import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import type { AuthRequest } from '../auth/types/auth-request.interface';
import { UploadImageService } from 'src/upload-image/upload-image.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('projects')
@UseGuards(JwtAuthGuard)
export class ProjectController {
  constructor(
    private readonly projectService: ProjectService,
    private readonly uploadImageService: UploadImageService,
  ) {}

  @Post()
  create(@Body() createProjectDto: CreateProjectDto, @Req() req: AuthRequest) {
    return this.projectService.create(createProjectDto, req.user);
  }

  @Get()
  findAll(@Req() req: AuthRequest) {
    return this.projectService.findAll(req.user);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: AuthRequest) {
    return this.projectService.findOne(+id, req.user);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
    @Req() req: AuthRequest,
  ) {
    return this.projectService.update(+id, updateProjectDto, req.user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: AuthRequest) {
    return this.projectService.remove(+id, req.user);
  }

  @Patch(':id/remove-tech')
  removeTech(
    @Param('id') id: string,
    @Body('techId') techId: number,
    @Req() req: AuthRequest,
  ) {
    return this.projectService.removeTech(+id, techId, req.user);
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
    if (!file) throw new BadRequestException('La foto es obligatoria.');
    try {
      const folder = 'portafolio/projects';

      const res = await this.uploadImageService.uploadFile(file, folder);
      if ('secure_url' in res) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const secureUrl = res.secure_url;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        await this.projectService.update(+id, { img_url: secureUrl }, req.user);

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
