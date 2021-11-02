import { Module } from '@nestjs/common';
import { RentService } from './rent.service';
import { RentController } from './rent.controller';
import { Rent } from './entities/rent.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [RentController],
  providers: [RentService],
  imports: [TypeOrmModule.forFeature([Rent])],
})
export class RentModule {}
