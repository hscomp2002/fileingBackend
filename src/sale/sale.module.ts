import { Module } from '@nestjs/common';
import { SaleService } from './sale.service';
import { SaleController } from './sale.controller';
import { Sale } from './entities/sale.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mahdoode } from '../mahdoode/entities/mahdoode.entity';
import { Customer } from 'src/customer/entities/customer.entity';

@Module({
  controllers: [SaleController],
  providers: [SaleService],
  imports: [TypeOrmModule.forFeature([Sale, Mahdoode, Customer])],
})
export class SaleModule {}
