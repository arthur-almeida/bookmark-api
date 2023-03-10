import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategy';

@Module({
  controllers: [AuthController],
  imports: [JwtModule.register({}), UserModule],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
