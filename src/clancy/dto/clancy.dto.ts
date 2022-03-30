import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class GrantRoleDto {
  @ApiProperty({
    type: String,
    description: 'Role to be granted',
    example: '0x...',
  })
  @IsString()
  role: string;

  @ApiProperty({
    type: String,
    description: 'Account address',
    example: '0x7C43CedB4C52262430193d4B0664016A7D0A2e07',
  })
  @IsString()
  account: string;
}

export class RevokeRoleDto {
  @ApiProperty({
    type: String,
    description: 'Role to be granted',
    example: '0x...',
  })
  @IsString()
  role: string;

  @ApiProperty({
    type: String,
    description: 'Account address',
    example: '0x7C43CedB4C52262430193d4B0664016A7D0A2e07',
  })
  @IsString()
  account: string;
}

export class AddPresignerDto {
  @ApiProperty({
    type: String,
    description: 'Account address',
    example: '0x7C43CedB4C52262430193d4B0664016A7D0A2e07',
  })
  @IsString()
  account: string;
}

export class RemovePresignerDto {
  @ApiProperty({
    type: String,
    description: 'Account address',
    example: '0x7C43CedB4C52262430193d4B0664016A7D0A2e07',
  })
  @IsString()
  account: string;
}

export class GrantBySignatureDto {
  @ApiProperty({
    type: String,
    description: 'Role to be granted',
    example: '0x...',
  })
  @IsString()
  role: string;

  @ApiProperty({
    type: String,
    description: 'Account address',
    example: '0x7C43CedB4C52262430193d4B0664016A7D0A2e07',
  })
  @IsString()
  account: string;

  @ApiProperty({
    type: String,
    description: 'Request Signature',
    example: '0x...',
  })
  @IsString()
  signature: string;
}

export class HasRoleDto {
  @ApiProperty({
    type: String,
    description: 'Role to be granted',
    example: '0x...',
  })
  @IsString()
  role: string;

  @ApiProperty({
    type: String,
    description: 'Account address',
    example: '0x7C43CedB4C52262430193d4B0664016A7D0A2e07',
  })
  @IsString()
  account: string;
}