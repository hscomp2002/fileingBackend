import { Controller, Get, UseGuards, Query } from '@nestjs/common';
import { RentService } from './rent.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import GetAllPaginated from './dto/get-all-paginated-dto';

@Controller('rent')
export class RentController {
  constructor(private readonly rentService: RentService) {}


  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Query() query:GetAllPaginated) {
    return this.rentService.findAll(query);
  }

}
