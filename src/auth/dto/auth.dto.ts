import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    type: String,
    description: 'Username',
    example: 'ClancyUser',
  })
  @IsString()
  username: string;

  @ApiProperty({
    type: String,
    description: 'Password',
    example: 'ClancyPwd',
  })
  @IsString()
  password: string;
}

export class ChangePasswordDto {
  @ApiProperty({
    type: String,
    description: 'Old Password',
    example: 'ClancyPwd',
  })
  @IsString()
  oldPassword: string;

  @ApiProperty({
    type: String,
    description: 'New Password',
    example: 'NewClancyPwd',
  })
  @IsString()
  newPassword: string;
} 