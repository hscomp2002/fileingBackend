import { Controller, Get, Post, Body, Patch, Param, Delete, Query ,UseGuards ,Request} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import GetAllPaginated from './dto/get-all-paginated-dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}
  
  @Post('auth/login')
  async login(@Request() req) {
    return req.user;
  }

  @Post()
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customerService.create(createCustomerDto);
  }

  @UseGuards(AuthGuard('local'))
  @Get()
  findAll(@Query() query: GetAllPaginated ) {
    return this.customerService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCustomerDto: UpdateCustomerDto) {
    return this.customerService.update(+id, updateCustomerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customerService.remove(+id);
  }
}
