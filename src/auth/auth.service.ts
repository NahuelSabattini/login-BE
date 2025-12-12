import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthUserDto } from './dto/auth-user.dto';
import { UsersService } from '../users/users.service';
import { matchPassword } from 'src/utils/bcrypt';
import { AUTH_MESSAGES } from './utils/constants';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async authenticate(authUserDto: AuthUserDto) {
    const user = await this.usersService.findUserByEmailOrUserName(
      authUserDto.userEmail,
      authUserDto.userName,
    );

    if (!user) throw new NotFoundException(AUTH_MESSAGES.USER_NOT_FOUND);

    const correctPassword = await matchPassword(
      authUserDto.password,
      user.password,
    );

    if (!correctPassword)
      throw new UnauthorizedException(AUTH_MESSAGES.INVALID_CREDENTIALS);

    const payload = {
      sub: user._id,
      email: user.email,
      userName: user.userName,
    };

    return {
      redirectUrl: user.applicationId.url,
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async validateToken(token: string) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const payload = await this.jwtService.verifyAsync(token);

      if (payload) return;
    } catch {
      throw new UnauthorizedException(AUTH_MESSAGES.TOKEN_INVALID);
    }
  }
}
