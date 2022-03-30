import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateWalletDto {
  @ApiProperty({
    type: String,
    description: 'Wallet Name',
    example: 'clancy demo'
  })
  @IsString()
  walletName: string;
}
