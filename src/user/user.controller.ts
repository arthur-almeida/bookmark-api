import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';

import { GetUser } from '../auth/decorators';
import { JwtGuard } from '../auth/guards';
import { EditUserDto } from './dtos';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  getMe(@GetUser() user: User) {
    return user;
  }

  @Patch()
  editUser(@GetUser('id') userId: number, @Body() editUserDto: EditUserDto) {
    return this.userService.editUser(userId, editUserDto);
  }
}
