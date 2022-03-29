import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserProvider } from 'src/user/user.provider';
import { LoginDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { AccessTokenPayload } from './types/jwtPayload';
import { User } from 'src/user/user.entity';

@Injectable()
export class AuthProvider {
  constructor(
    private readonly userProvider: UserProvider,
    private readonly jwtService: JwtService,
  ) {}

  login = async (loginDto: LoginDto) => {
    const user = await this.userProvider.verifyCredentials(
      loginDto.username,
      loginDto.password,
    );

    const payload: AccessTokenPayload = {
      id: user.id,
      isVerified: user.isVerified,
    };
    const accessToken = 'bearer ' + this.jwtService.sign(payload);

    return {
      accessToken,
    };
  };

  changePassword = async (oldPassword: string, newPassword: string, user: User) => {
    await this.userProvider.updatePassword(user.id, oldPassword, newPassword);
  }
}
