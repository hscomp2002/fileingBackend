import { Module } from '@nestjs/common';
import { SaleService } from './sale.service';
import { SaleController } from './sale.controller';
import { Sale } from './entities/sale.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [SaleController],
  providers: [SaleService],
  imports: [TypeOrmModule.forFeature([Sale])],
})
export class SaleModule {}
