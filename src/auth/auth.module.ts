import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthProvider } from './auth.provider';
import * as config from 'config';

@Module({
  imports: [
    JwtModule.register({
      secret: config.get('jwt.secret'),
      signOptions: { expiresIn: config.get('jwt.expiration') },
    }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthProvider],
})
export class AuthModule {}
