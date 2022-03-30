import { Module } from '@nestjs/common';
import { WalletController } from './wallet.controller';
import { WalletProvider } from './wallet.provider';
import { WaleltRepository } from './wallet.repository';
import { UserModule } from 'src/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [TypeOrmModule.forFeature([WaleltRepository]), UserModule],
  controllers: [WalletController],
  providers: [WalletProvider],
})
export class WalletModule {}
