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
import { User } from './user.entity';
import { UserProvider } from './user.provider';

@Controller('user')
export class UserController {
  constructor(private readonly userProvider: UserProvider) {}

  @Get('/:userId')
  @ApiParam({ name: 'userId', type: 'string' })
  async getUser(@Param() getUserDto: GetUserDto) {
    // let user: Omit<User, 'username'>;
    const user = await this.userProvider.getUserById(+getUserDto.userId);
    // delete user.password
    return user;
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
