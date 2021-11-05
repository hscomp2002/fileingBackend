import { Module } from '@nestjs/common';
import { CustomersMahdoodeService } from './customers-mahdoode.service';
import { CustomersMahdoodeController } from './customers-mahdoode.controller';

@Module({
  controllers: [CustomersMahdoodeController],
  providers: [CustomersMahdoodeService]
})
export class CustomersMahdoodeModule {}
