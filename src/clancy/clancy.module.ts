import { Module } from '@nestjs/common';
import { ClancyProvider } from './clancy.provider';
import { ClancyController } from './clancy.controller';

@Module({
  providers: [ClancyProvider],
  controllers: [ClancyController]
})
export class ClancyModule {}
