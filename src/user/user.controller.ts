import { Controller, Get, UseGuards } from '@nestjs/common';

import { GetUser } from '../auth/decorators';
import { JwtGuard } from '../auth/guards';
import { User } from './entities/user.entity';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  @Get('me')
  getMe(@GetUser() user: User) {
    return user;
  }
}
