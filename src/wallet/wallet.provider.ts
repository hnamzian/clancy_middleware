import { Injectable } from '@nestjs/common';
import { QkmsAccount } from 'src/core/qkms/QkmsAccount';
import { User } from 'src/user/user.entity';
import { UserProvider } from 'src/user/user.provider';
import { CreateWalletDto } from './dto/wallet.dto';
import { Wallet } from './wallet.entity';
import { WaleltRepository } from './wallet.repository';
import * as config from 'config';
import { QkmsAdapter } from 'src/core/qkms/QkmsAdapter';

@Injectable()
export class WalletProvider {
  private qkmsAccounts: QkmsAccount;

  constructor(
    private readonly walletRepository: WaleltRepository,
    private readonly userprovider: UserProvider,
  ) {
    const qkmsAdapterConfigs = config.get('qkms.adapter');
    console.log(qkmsAdapterConfigs);
    
    const qkmsAdapter = new QkmsAdapter(qkmsAdapterConfigs);
    this.qkmsAccounts = new QkmsAccount(qkmsAdapter);
  }

  getWallets = async (userId: number) => {
    return await this.walletRepository.find({ user: { id: userId } });
  };

  getWalletByAddress = async (walletAddress) => {
    return await this.walletRepository.findOne({ address: walletAddress })
  }

  createWallet = async (createWalletDto: CreateWalletDto, user: User) => {
    // const { address: walletAddress } = await this.qkmsAccounts.importAccount(
    //   '0x30a0ef4d34e52a404aafe20d6bddf6b2f9840eec6d54b7fad8bc5e9a55fbf81a',
    //   "clancy",
    //   "tag1",
    //   "tag2"
    // );
    const { address: walletAddress } = await this.qkmsAccounts.createAccount(
      createWalletDto.walletName,
    );
    console.log(walletAddress);

    const walletData: Wallet = {
      walletName: createWalletDto.walletName,
      address: walletAddress,
      user,
    } as Wallet;
    const wallet = this.walletRepository.create(walletData);
    return await wallet.save();
  };
}
