import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { CreateUserDto, DeleteUserDto, GetUserDto } from './dto/user.dto';
import { UserProvider } from './user.provider';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userProvider: UserProvider) {}

  @ApiParam({ name: 'userId', type: 'string' })
  @ApiBearerAuth('access-token')
  @Get('/:userId')
  @Roles('ADMIN')
  async getUser(@Param() getUserDto: GetUserDto) {
    // let user: Omit<User, 'username'>;
    const user = await this.userProvider.getUserById(+getUserDto.userId);
    // delete user.password
    return user;
  }

  @ApiBody({ type: CreateUserDto })
  @ApiBearerAuth('access-token')
  @Post('/')
  @Roles('ADMIN')
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.userProvider.createUser(createUserDto);
  }

  @ApiParam({ name: 'userId', type: 'string' })
  @ApiBearerAuth('access-token')
  @Delete('/:userId')
  @Roles('ADMIN')
  async deleteUser(@Param() deleteUserDto: DeleteUserDto) {
    await this.userProvider.deleteUser(deleteUserDto.userId);
    return {
      isDeleted: true,
    };
  }
}
