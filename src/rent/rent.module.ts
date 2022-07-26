import { Module } from '@nestjs/common';
import { RentService } from './rent.service';
import { RentController } from './rent.controller';
import { Rent } from './entities/rent.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mahdoode } from '../mahdoode/entities/mahdoode.entity';
import { Customer } from 'src/customer/entities/customer.entity';

@Module({
  controllers: [RentController],
  providers: [RentService],
  imports: [TypeOrmModule.forFeature([Rent, Mahdoode, Customer])],
})
export class RentModule {}
