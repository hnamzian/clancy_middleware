import { Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { ClancyProvider } from './clancy.provider';
import { GrantBySignatureDto } from './dto/clancy.dto';

@ApiTags('Clancy')
@Controller('clancy')
export class ClancyController {
  constructor(private readonly clancyProvide: ClancyProvider) {}

  @Post('/roles/grant-by-signature')
  @ApiBearerAuth('access-token')
  @ApiBody({ type: GrantBySignatureDto })
  async grantRoleBySignature(grantRoleBySignatureDto: GrantBySignatureDto) {
    return await this.clancyProvide.grantBySignature(grantRoleBySignatureDto);
  }
}
