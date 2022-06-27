import { Module } from '@nestjs/common';
import { MahdoodeService } from './mahdoode.service';
import { MahdoodeController } from './mahdoode.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Mahdoode } from './entities/mahdoode.entity';

@Module({
  controllers: [MahdoodeController],
  providers: [MahdoodeService],
  imports: [TypeOrmModule.forFeature([Mahdoode])],
})
export class MahdoodeModule {}
