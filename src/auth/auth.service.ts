import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UserRepository } from 'src/user/user.repository';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { jwtConstants } from './constants';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto): Promise<{ accessToken: string }> {
    const user = await this.userRepository.findOneBy({ email: loginDto.email });
    if (!user || !user.is_verified) {
      throw new UnauthorizedException('Email not verified');
    }
    if (!user || !(await bcrypt.compare(loginDto.password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id, email: user.email, role: user.role };
    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }

  async verifyEmail(token: string): Promise<{ message: string }> {
    const decoded = await this.jwtService
      .verifyAsync(token, {
        secret: jwtConstants.secret,
      })
      .catch(() => {
        throw new UnauthorizedException('Invalid or expired token');
      });

    await this.userRepository
      .updateVerifiedEmail(decoded.sub, true)
      .then((value) => {
        if (!value) {
          throw new UnauthorizedException('Could not verify email');
        }
      });

    return { message: 'Email verified successfully' };
  }
}
