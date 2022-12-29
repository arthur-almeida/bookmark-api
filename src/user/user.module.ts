import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserController } from './user.controller';

@Module({
  controllers: [UserController],
  exports: [TypeOrmModule],
  imports: [TypeOrmModule.forFeature([User])],
})
export class UserModule {}
