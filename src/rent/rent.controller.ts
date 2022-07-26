import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { RentService } from './rent.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import GetAllPaginated from './dto/get-all-paginated-dto';
import { UserInfoDto } from 'src/customer/dto/user-info.dto';

@Controller('rent')
export class RentController {
  constructor(private readonly rentService: RentService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Request() req: any) {
    return this.rentService.findAll(
      req.query as GetAllPaginated,
      req.user as UserInfoDto,
    );
  }
}
