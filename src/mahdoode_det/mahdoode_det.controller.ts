import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { MahdoodeDetService } from './mahdoode_det.service';
import { CreateMahdoodeDetDto } from './dto/create-mahdoode_det.dto';
import { UpdateMahdoodeDetDto } from './dto/update-mahdoode_det.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import GetAllPaginated from './dto/get-all-paginated-dto';

@Controller('mahdoode-det')
export class MahdoodeDetController {
  constructor(private readonly mahdoodeDetService: MahdoodeDetService) {}

  @Post()
  create(@Body() createMahdoodeDetDto: CreateMahdoodeDetDto) {
    return this.mahdoodeDetService.create(createMahdoodeDetDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Query() query: GetAllPaginated) {
    return this.mahdoodeDetService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mahdoodeDetService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMahdoodeDetDto: UpdateMahdoodeDetDto,
  ) {
    return this.mahdoodeDetService.update(+id, updateMahdoodeDetDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mahdoodeDetService.remove(+id);
  }
}
