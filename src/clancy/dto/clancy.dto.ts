import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export enum ClancyRole {
  admin = 'ADMIN',
  minter = 'MINTER',
  pauser = 'PAUSER',
  presigner = 'PRESIGNER',
  uriSetter = 'URI_SETTER',
}

export class GrantRoleDto {
  @ApiProperty({
    enum: ClancyRole,
    description: 'Role to be granted',
    example: ClancyRole.admin,
  })
  @IsString()
  role: ClancyRole;

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
    enum: ClancyRole,
    description: 'Role to be granted',
    example: ClancyRole.admin,
  })
  @IsString()
  role: ClancyRole;

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
    enum: ClancyRole,
    description: 'Role to be granted',
    example: ClancyRole.admin,
  })
  @IsString()
  role: ClancyRole;

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
    enum: ClancyRole,
    description: 'Role to be granted',
    example: ClancyRole.admin,
  })
  @IsString()
  role: ClancyRole;

  @ApiProperty({
    type: String,
    description: 'Account address',
    example: '0x7C43CedB4C52262430193d4B0664016A7D0A2e07',
  })
  @IsString()
  account: string;
}
