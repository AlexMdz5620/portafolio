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
  Put,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import type { AuthRequest } from '../auth/types/auth-request.interface';

@Controller('projects')
@UseGuards(JwtAuthGuard)
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

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

  @Put(':id')
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
}
