import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

export class GetUserDto {
  @ApiProperty({
    type: String,
    description: 'user id',
    example: '1'
  })
  @IsString()
  id: string
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
    type: String,
    description: 'Is User Admin?',
    example: false,
  })
  @IsBoolean()
  isAdmin: boolean;
}

export class DeleteUserDto {
  @ApiProperty({
    type: String,
    description: 'user id',
    example: '1'
  })
  @IsString()
  id: string
}