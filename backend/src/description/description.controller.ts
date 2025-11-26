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
import { DescriptionService } from './description.service';
import { CreateDescriptionDto } from './dto/create-description.dto';
import { UpdateDescriptionDto } from './dto/update-description.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import type { AuthRequest } from 'src/auth/types/auth-request.interface';
import { DeleteVerificationGuard } from 'src/auth/guard/delete-verification.guard';

@Controller('description')
@UseGuards(JwtAuthGuard)
export class DescriptionController {
  constructor(private readonly descriptionService: DescriptionService) {}

  @Post()
  create(
    @Body() createDescriptionDto: CreateDescriptionDto,
    @Req() req: AuthRequest,
  ) {
    return this.descriptionService.create(createDescriptionDto, req.user);
  }

  @Get()
  findAll(@Req() req: AuthRequest) {
    return this.descriptionService.findAll(req.user);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: AuthRequest) {
    return this.descriptionService.findOne(+id, req.user);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDescriptionDto: UpdateDescriptionDto,
    @Req() req: AuthRequest,
  ) {
    return this.descriptionService.update(+id, updateDescriptionDto, req.user);
  }

  @Delete(':id')
  @UseGuards(DeleteVerificationGuard)
  remove(@Param('id') id: string, @Req() req: AuthRequest) {
    return this.descriptionService.remove(+id, req.user);
  }
}
