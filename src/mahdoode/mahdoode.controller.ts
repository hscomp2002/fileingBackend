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
import { MahdoodeService } from './mahdoode.service';
import { CreateMahdoodeDto } from './dto/create-mahdoode.dto';
import { UpdateMahdoodeDto } from './dto/update-mahdoode.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import GetAllPaginated from './dto/get-all-paginated-dto';

@Controller('mahdoode')
export class MahdoodeController {
  constructor(private readonly mahdoodeService: MahdoodeService) {}

  @Post()
  create(@Body() createMahdoodeDto: CreateMahdoodeDto) {
    return this.mahdoodeService.create(createMahdoodeDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Query() query: GetAllPaginated) {
    return this.mahdoodeService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mahdoodeService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMahdoodeDto: UpdateMahdoodeDto,
  ) {
    return this.mahdoodeService.update(+id, updateMahdoodeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mahdoodeService.remove(+id);
  }
}
