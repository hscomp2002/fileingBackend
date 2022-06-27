import { Module } from '@nestjs/common';
import { MahdoodeDetService } from './mahdoode_det.service';
import { MahdoodeDetController } from './mahdoode_det.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { MahdoodeDet } from './entities/mahdoode_det.entity';

@Module({
  controllers: [MahdoodeDetController],
  providers: [MahdoodeDetService],
  imports: [TypeOrmModule.forFeature([MahdoodeDet])],
})
export class MahdoodeDetModule {}
