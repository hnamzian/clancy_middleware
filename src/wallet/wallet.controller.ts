import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { CreateWalletDto } from './dto/wallet.dto';
import { WalletProvider } from './wallet.provider';

@ApiTags('Wallet')
@Controller('wallet')
export class WalletController {
  constructor(private readonly walletProvider: WalletProvider) {}

  @ApiBearerAuth('access-token')
  @Get('/list')
  async getWallets(@Req() req) {
    const wallets = await this.walletProvider.getWallets(req.user.id);
    return wallets.map((w) => {
      return {
        id: w.id,
        walletName: w.walletName,
        address: w.address,
        user: {
          id: req.user.id,
        },
      };
    });
  }

  @ApiParam({ name: 'address', type: String, example: '0x' })
  @ApiBearerAuth('access-token')
  @Get('/address/:address')
  @Roles('ADMIN')
  async getWalletByAddress(@Param() walletAddress: string) {
    const { id, walletName, address, user } =
      await this.walletProvider.getWalletByAddress(walletAddress);
    return {
      id,
      walletName,
      address,
      user: {
        id: user.id,
      },
    };
  }

  @ApiBody({ type: CreateWalletDto })
  @ApiBearerAuth('access-token')
  @Post('/')
  async createWallet(@Body() createWalletDto: CreateWalletDto, @Req() req) {
    const { id, walletName, address, user } =
      await this.walletProvider.createWallet(createWalletDto, req.user);
    return {
      id,
      walletName,
      address,
      user: {
        id: user.id,
      },
    };
  }
}
