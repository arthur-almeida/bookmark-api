import * as argon from 'argon2';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { User } from 'src/user/entities/user.entity';
import { AuthDto } from './dtos';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  public async signup({ email, password }: AuthDto) {
    // TODO: handle errors
    const hash = await argon.hash(password);
    const user = this.userRepository.create({
      email,
      hash,
    });
    return this.userRepository.save(user);
  }
}
