import { Module } from '@nestjs/common';
import { UserProvider } from './user.provider';
import { UserController } from './user.controller';

@Module({
  providers: [UserProvider],
  controllers: [UserController]
})
export class UserModule {}
