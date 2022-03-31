import { Module } from '@nestjs/common';
import { ClancyProvider } from './clancy.provider';
import { ClancyController } from './clancy.controller';
import { WalletModule } from 'src/wallet/wallet.module';

@Module({
  imports: [WalletModule],
  providers: [ClancyProvider],
  controllers: [ClancyController]
})
export class ClancyModule {}
