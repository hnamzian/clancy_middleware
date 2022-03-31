import { Injectable, UnauthorizedException } from '@nestjs/common';
import { IQkmsAdapterConfig, QkmsAdapter } from 'src/core/qkms/QkmsAdapter';
import { IQkmsNodeConfig, QkmsNode } from 'src/core/qkms/QkmsNode';
import * as config from 'config';
import * as fs from 'fs';
import { QkmsAccount, QkmsAccountConfig } from 'src/core/qkms/QkmsAccount';
import { QkmsContract } from 'src/core/qkms/QkmsContract';
import {
  AddPresignerDto,
  GrantBySignatureDto,
  GrantRoleDto,
  HasRoleDto,
  RemovePresignerDto,
  RevokeRoleDto,
} from './dto/clancy.dto';
import { Users } from 'src/user/user.entity';
import { WalletProvider } from 'src/wallet/wallet.provider';
import { ClancyRoleConstants } from './constants/clancy.constants';

@Injectable()
export class ClancyProvider {
  private qkmsAccount: QkmsAccount;
  private qkmsNode: QkmsNode;
  private qkmsContract: QkmsContract;
  private account: QkmsAccountConfig;

  constructor(private readonly walletProvider: WalletProvider) {
    const qkmsAdapterConfig: IQkmsAdapterConfig = config.get('qkms.adapter');
    const qkmsNodeConfig: IQkmsNodeConfig = config.get('qkms.nodes.clancy');

    const clancyContractAddress = config.get('clancy.address');
    const { abi: clancyABI } = JSON.parse(
      fs.readFileSync(config.get('clancy.abiPath')).toString(),
    );

    this.account = config.get('qkms.account');

    const qkmsAdapter = new QkmsAdapter(qkmsAdapterConfig);
    this.qkmsAccount = new QkmsAccount(qkmsAdapter);
    this.qkmsNode = new QkmsNode(qkmsAdapter, qkmsNodeConfig);
    this.qkmsContract = new QkmsContract(
      this.qkmsNode,
      clancyContractAddress,
      clancyABI,
    );
  }

  async grantRole(grantRoleDto: GrantRoleDto, user: Users) {
    const signer = await this.walletProvider.getWalletByUserId(user.id)
    
    // const wallet = await this.walletProvider.getWalletByAddress(grantRoleDto.account)
    // if (!wallet.user || wallet.user.id !== user.id) {
    //   throw new UnauthorizedException('User is not authorized for this wallet')
    // }

    const result = await this.qkmsContract.sendEthTransaction(
      signer.address,
      'grantRole',
      [ClancyRoleConstants[grantRoleDto.role], grantRoleDto.account],
      '0x0',
    );
    
    return result;
  }

  async revokeRole(revokeRoleDto: RevokeRoleDto, user: Users) {
    const signer = await this.walletProvider.getWalletByUserId(user.id)

    // const wallet = await this.walletProvider.getWalletByAddress(revokeRoleDto.account)
    // if (wallet.user.id !== user.id) {
    //   throw new UnauthorizedException('User is not authorized for this wallet')
    // }

    const receipt = await this.qkmsContract.sendEthTransaction(
      signer.address,
      'revokeRole',
      [ClancyRoleConstants[revokeRoleDto.role], revokeRoleDto.account],
      '0x0',
    );

    return receipt;
  }

  async presigner() {}

  async getPresigner(account: string) {}

  async addPresigner(addPresignerDto: AddPresignerDto, user: Users) {
    const signer = await this.walletProvider.getWalletByUserId(user.id)
    
    // const wallet = await this.walletProvider.getWalletByAddress(addPresignerDto.account)
    // if (wallet.user.id !== user.id) {
    //   throw new UnauthorizedException('User is not authorized for this wallet')
    // }

    const result = await this.qkmsContract.sendEthTransaction(
      signer.address,
      'revokeRole',
      [addPresignerDto.account],
      '0x0',
    );

    return result;
  }

  async removePresigner(removePresignerDto: RemovePresignerDto, user: Users) {
    const signer = await this.walletProvider.getWalletByUserId(user.id)

    // const wallet = await this.walletProvider.getWalletByAddress(removePresignerDto.account)
    // if (wallet.user.id !== user.id) {
    //   throw new UnauthorizedException('User is not authorized for this wallet')
    // }

    const result = await this.qkmsContract.sendEthTransaction(
      signer.address,
      'revokeRole',
      [removePresignerDto.account],
      '0x0',
    );

    return result;
  }

  grantBySignature = async (grantRoleBySignatureDto: GrantBySignatureDto, user: Users) => {
    const signer = await this.walletProvider.getWalletByUserId(user.id)
    
    const result = await this.qkmsContract.sendEthTransaction(
      signer.address,
      'grantRoleBySignature',
      [],
      '0x0',
    );

    return result;
  };

  async hasRole(hasRoleDto: HasRoleDto) {}
}
