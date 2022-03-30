import { Body, Controller, Get, Param, Post, Query, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ClancyProvider } from './clancy.provider';
import { AddPresignerDto, GrantBySignatureDto, GrantRoleDto, HasRoleDto, RemovePresignerDto, RevokeRoleDto } from './dto/clancy.dto';

@ApiTags('Clancy')
@ApiBearerAuth('access-token')
@Controller('clancy')
export class ClancyController {
  constructor(private readonly clancyProvide: ClancyProvider) {}

  @ApiBody({ type: GrantRoleDto })
  @Post('/grant-role')
  async grantRole(@Body() grantRoleDto: GrantRoleDto, @Req() req) {}

  @ApiBody({ type: RevokeRoleDto })
  @Post('/revoke-role')
  async revokeRole(@Body() revokeROleDto: RevokeRoleDto, @Req() req) {}


  @Get('presigner')
  async presigner() {}

  @ApiParam({ name: 'account', type: String, example: '0x' })
  @Get('/presigner/:account')
  async getPresigner(@Param() account: string) {}

  @ApiBody({ type: AddPresignerDto })
  @Post('/add-presigner')
  async addPresigner(@Body() addPresignerDto: AddPresignerDto, @Req() req) {}

  @ApiBody({ type: RemovePresignerDto })
  @Post('/add-presigner')
  async removePresigner(@Body() removePresignerDto: RemovePresignerDto, @Req() req) {}

  @ApiBody({ type: GrantBySignatureDto })
  @Post('/roles/grant-by-signature')
  async grantRoleBySignature(grantRoleBySignatureDto: GrantBySignatureDto, @Req() req) {
    return await this.clancyProvide.grantBySignature(grantRoleBySignatureDto);
  }

  // @ApiQuery({ type: HasRoleDto })
  @Get('/has-role')
  async hasRole(@Query() hasRoleDto: HasRoleDto) {}
}

// grantRole
// revokeRole
// presigner()
// getPresigner(address)
// addPresigner(address)
// removePresigner(address)
// grantRoleBySignature(role(bytes32), account(address), signature(bytes32))
// hasRole(role(bytes32), account(address))