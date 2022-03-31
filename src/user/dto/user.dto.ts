import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';
import { UserRole } from '../user.entity';

export class GetUserDto {
  @ApiProperty({
    type: String,
    description: 'user id',
    example: '1',
  })
  @IsString()
  userId: string;
}

export class CreateUserDto {
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

  @ApiProperty({
    enum: UserRole,
    description: 'User Role',
    example: UserRole.client,
  })
  @IsEnum(UserRole)
  role: UserRole;

  @ApiProperty({
    type: Boolean,
    description: 'User is Verified',
    example: false,
  })
  @IsOptional()
  @IsBoolean()
  isVerified: boolean;
}

export class DeleteUserDto {
  @ApiProperty({
    type: String,
    description: 'user id',
    example: '1',
  })
  @IsString()
  userId: string;
}
