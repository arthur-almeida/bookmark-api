import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dtos';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  public async signup(@Body() authDto: AuthDto) {
    const { hash, ...user } = await this.authService.signup(authDto);
    return user;
  }

  @Post('signin')
  public signin(@Body() authDto: AuthDto) {
    return this.authService.signin(authDto);
  }
}
