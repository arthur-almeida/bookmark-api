import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as argon from 'argon2';
import { Repository } from 'typeorm';

import { AuthDto } from './dtos';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  public async signup({ email, password }: AuthDto) {
    // TODO: handle errors
    const hash = await argon.hash(password);
    const user = this.userRepository.create({
      email,
      hash,
    });
    await this.userRepository.save(user);
    return this.signToken({ email, userId: user.id });
  }

  public async signin({ email, password }: AuthDto) {
    const user = await this.userRepository.findOneBy({
      email,
    });
    if (!user) {
      throw new ForbiddenException('Credentials incorrect');
    }
    const isPasswordMatches = await argon.verify(user.hash, password);
    if (!isPasswordMatches) {
      throw new ForbiddenException('Credentials incorrect');
    }
    return this.signToken({ email, userId: user.id });
  }

  public async signToken({ email, userId }: { email: string; userId: number }) {
    const payload = {
      sub: userId,
      email,
    };
    const token = await this.jwtService.signAsync(payload, {
      expiresIn: '15m',
      secret: 'secret ',
    });
    return {
      access_token: token,
    };
  }
}
