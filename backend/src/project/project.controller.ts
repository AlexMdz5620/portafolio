import {
  Controller,
  Get,
  Post,
  Body,
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
import { DeleteVerificationGuard } from 'src/auth/guard/delete-verification.guard';

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
  @UseGuards(DeleteVerificationGuard)
  remove(@Param('id') id: string, @Req() req: AuthRequest) {
    return this.projectService.remove(+id, req.user);
  }
}
