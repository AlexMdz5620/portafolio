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
} from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import type { AuthRequest } from '../auth/types/auth-request.interface';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';

@Controller('courses')
@UseGuards(JwtAuthGuard)
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

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
}
