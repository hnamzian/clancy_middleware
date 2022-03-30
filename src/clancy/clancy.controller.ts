import { Body, Controller, Get, Param, Post, Query, Req } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { ClancyProvider } from './clancy.provider';
import {
  AddPresignerDto,
  GrantBySignatureDto,
  GrantRoleDto,
  HasRoleDto,
  RemovePresignerDto,
  RevokeRoleDto,
} from './dto/clancy.dto';

@ApiTags('Clancy')
@ApiBearerAuth('access-token')
@Controller('clancy')
export class ClancyController {
  constructor(private readonly clancyProvider: ClancyProvider) {}

  @ApiBody({ type: GrantRoleDto })
  @Post('/grant-role')
  async grantRole(@Body() grantRoleDto: GrantRoleDto, @Req() req) {
    return await this.clancyProvider.grantRole(grantRoleDto, req.user);
  }

  @ApiBody({ type: RevokeRoleDto })
  @Post('/revoke-role')
  async revokeRole(@Body() revokeRoleDto: RevokeRoleDto, @Req() req) {
    return await this.clancyProvider.revokeRole(revokeRoleDto, req.user);
  }

  @Get('presigner')
  async presigner() {
    await this.clancyProvider.presigner();
  }

  @ApiParam({ name: 'account', type: String, example: '0x' })
  @Get('/presigner/:account')
  async getPresigner(@Param() account: string) {
    return await this.clancyProvider.getPresigner(account);
  }

  @ApiBody({ type: AddPresignerDto })
  @Post('/add-presigner')
  async addPresigner(@Body() addPresignerDto: AddPresignerDto, @Req() req) {
    return await this.clancyProvider.addPresigner(addPresignerDto, req.user);
  }

  @ApiBody({ type: RemovePresignerDto })
  @Post('/add-presigner')
  async removePresigner(
    @Body() removePresignerDto: RemovePresignerDto,
    @Req() req,
  ) {
    return await this.clancyProvider.removePresigner(
      removePresignerDto,
      req.user,
    );
  }

  @ApiBody({ type: GrantBySignatureDto })
  @Post('/roles/grant-by-signature')
  async grantRoleBySignature(
    grantRoleBySignatureDto: GrantBySignatureDto,
    @Req() req,
  ) {
    return await this.clancyProvider.grantBySignature(
      grantRoleBySignatureDto,
      req.user,
    );
  }

  // @ApiQuery({ type: HasRoleDto })
  @Get('/has-role')
  async hasRole(@Query() hasRoleDto: HasRoleDto) {
    return await this.clancyProvider.hasRole(hasRoleDto);
  }
}