import { Controller, Get, Param, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserInfoDto } from 'src/customer/dto/user-info.dto';
import GetAllPaginated from './dto/get-all-paginated-dto';
import { SaleService } from './sale.service';

@Controller('sale')
export class SaleController {
  constructor(private readonly saleService: SaleService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Request() req: any) {
    return this.saleService.findAll(
      req.query as GetAllPaginated,
      req.user as UserInfoDto,
    );
  }
  // findAll(@Query() query: GetAllPaginated) {
  //   return this.saleService.findAll(query);
  // }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.saleService.findOne(+id);
  }
}
