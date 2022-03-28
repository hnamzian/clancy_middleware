import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { CreateUserDto, DeleteUserDto, GetUserDto } from './dto/user.dto';
import { UserProvider } from './user.provider';

@Controller('user')
export class UserController {
  constructor(private readonly userProvider: UserProvider) {}

  @Get('/')
  @ApiBody({ type: GetUserDto })
  async getUser() {}

  @Post('/')
  @ApiBody({ type: CreateUserDto })
  async createUser() {}

  @ApiBody({ type: DeleteUserDto })
  @Delete('/')
  async removeUser() {}
}
