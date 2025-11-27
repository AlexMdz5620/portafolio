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
} from '@nestjs/common';
import { TechService } from './tech.service';
import { CreateTechDto } from './dto/create-tech.dto';
import { UpdateTechDto } from './dto/update-tech.dto';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import type { AuthRequest } from '../auth/types/auth-request.interface';

@Controller('techs')
@UseGuards(JwtAuthGuard)
export class TechsController {
  constructor(private readonly techService: TechService) {}

  @Post()
  create(@Body() createTechDto: CreateTechDto, @Req() req: AuthRequest) {
    return this.techService.create(createTechDto, req.user);
  }

  @Get()
  findAll(@Req() req: AuthRequest) {
    return this.techService.findAll(req.user);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: AuthRequest) {
    return this.techService.findOne(+id, req.user);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTechDto: UpdateTechDto,
    @Req() req: AuthRequest,
  ) {
    return this.techService.update(+id, updateTechDto, req.user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: AuthRequest) {
    return this.techService.remove(+id, req.user);
  }
}
