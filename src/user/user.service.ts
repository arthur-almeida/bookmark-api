import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EditUserDto } from './dtos';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async editUser(userId: number, editUserDto: EditUserDto) {
    this.userRepository.update({ id: userId }, editUserDto);
  }
}
