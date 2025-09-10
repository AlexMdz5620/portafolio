import { Controller, Get, Body, Patch, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ChangePasswordDto } from './dto/change-pass-user.dto';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import type { AuthRequest } from '../auth/types/auth-request.interface';

@Controller('users')
@UseGuards(JwtAuthGuard) // protege todo
export class UsersController {
  constructor(private readonly userService: UserService) {}

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
}
