import { Body, Controller, Post, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthProvider } from './auth.provider';
import { ChangePasswordDto, LoginDto } from './dto/auth.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authProvider: AuthProvider) {}

  @ApiBody({ type: LoginDto })
  @Post('/login')
  async login(@Body() loginDto: LoginDto) {
    return this.authProvider.login(loginDto);
  }

  @ApiBody({ type: ChangePasswordDto })
  @ApiBearerAuth('access-token')
  @Post('/change-password')
  async changePassword(
    @Body() changePasswordDto: ChangePasswordDto,
    @Req() req: any,
  ) {
    return await this.authProvider.changePassword(
      changePasswordDto.oldPassword,
      changePasswordDto.newPassword,
      req.user,
    );
  }
}
