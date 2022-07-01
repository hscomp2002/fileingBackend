import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import GetAllPaginated from './dto/get-all-paginated-dto';
import { SaleService } from './sale.service';

@Controller('sale')
export class SaleController {
  constructor(private readonly saleService: SaleService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Query() query: GetAllPaginated) {
    console.log(query);
    return this.saleService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.saleService.findOne(+id);
  }
}
