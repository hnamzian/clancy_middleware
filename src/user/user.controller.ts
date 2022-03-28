import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post
} from '@nestjs/common';
import { ApiBody, ApiParam } from '@nestjs/swagger';
import { CreateUserDto, DeleteUserDto, GetUserDto } from './dto/user.dto';
import { UserProvider } from './user.provider';

@Controller('user')
export class UserController {
  constructor(private readonly userProvider: UserProvider) {}

  @Get('/:userId')
  @ApiParam({ name: 'userId', type: 'string' })
  async getUser(@Param() getUserDto: GetUserDto) {
    return await this.userProvider.getUserById(+getUserDto.userId);
  }

  @Post('/')
  @ApiBody({ type: CreateUserDto })
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.userProvider.createUser(createUserDto);
  }

  @ApiParam({ name: 'userId', type: 'string' })
  @Delete('/:userId')
  async deleteUser(@Param() deleteUserDto: DeleteUserDto) {
    await this.userProvider.deleteUser(deleteUserDto.userId);
    return {
      isDeleted: true,
    };
  }
}
