import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsString } from 'class-validator';
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
    example: UserRole.admin,
  })
  @IsEnum(UserRole)
  role: UserRole;
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
