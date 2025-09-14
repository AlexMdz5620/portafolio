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
import { LinkService } from './link.service';
import { CreateLinkDto } from './dto/create-link.dto';
import { UpdateLinkDto } from './dto/update-link.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import type { AuthRequest } from 'src/auth/types/auth-request.interface';

@Controller('links')
@UseGuards(JwtAuthGuard)
export class LinkController {
  constructor(private readonly linkService: LinkService) {}

  @Post()
  create(@Body() createLinkDto: CreateLinkDto, @Req() req: AuthRequest) {
    return this.linkService.create(createLinkDto, req.user);
  }

  @Get()
  findAll(@Req() req: AuthRequest) {
    return this.linkService.findAll(req.user);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: AuthRequest) {
    return this.linkService.findOne(+id, req.user);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateLinkDto: UpdateLinkDto,
    @Req() req: AuthRequest,
  ) {
    return this.linkService.update(+id, updateLinkDto, req.user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: AuthRequest) {
    return this.linkService.remove(+id, req.user);
  }
}
