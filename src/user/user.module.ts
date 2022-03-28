import { Module } from '@nestjs/common';
import { UserProvider } from './user.provider';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository])],
  providers: [UserProvider],
  controllers: [UserController],
})
export class UserModule {}
