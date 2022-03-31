import { ConflictException, Injectable } from '@nestjs/common';
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
    if (await this.walletRepository.findOne({
      user,
      walletName: createWalletDto.walletName
    })) {
      throw new ConflictException('Wallet with this name already exists')
    }

    const result = await this.qkmsAccounts.createAccount(
      createWalletDto.walletName,
    );
    
    const walletData: Wallet = {
      walletName: createWalletDto.walletName,
      address: result.address,
      user,
    } as Wallet;
    const wallet = this.walletRepository.create(walletData);
    
    return await wallet.save();
  };
}
