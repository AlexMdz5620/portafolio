import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { PublicService } from './public.service';

@Controller('public')
export class PublicController {
  constructor(private readonly publicService: PublicService) {}

  @Get('profile/:userId')
  getProfile(@Param('userId', ParseIntPipe) userId: number) {
    return this.publicService.getProfile(userId);
  }

  @Get('projects/:userId')
  getProjects(@Param('userId', ParseIntPipe) userId: number) {
    return this.publicService.getProjects(userId);
  }

  @Get('courses/:userId')
  getCourses(@Param('userId', ParseIntPipe) userId: number) {
    return this.publicService.getCourses(userId);
  }

  @Get('techs/:userId')
  getTechs(@Param('userId', ParseIntPipe) userId: number) {
    return this.publicService.getTechs(userId);
  }
}
