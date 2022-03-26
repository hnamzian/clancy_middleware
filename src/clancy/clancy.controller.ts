import { Controller, Post } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { ClancyProvider } from './clancy.provider';
import { GrantBySignatureDto } from './dto/clancy.dto';

@Controller('clancy')
export class ClancyController {
  constructor(private readonly clancyProvide: ClancyProvider) {}

  @Post('/roles/grant-by-signature')
  @ApiBody({ type: GrantBySignatureDto })
  async grantRoleBySignature(grantRoleBySignatureDto: GrantBySignatureDto) {
    return await this.clancyProvide.grantBySignature(grantRoleBySignatureDto);
  }
}
