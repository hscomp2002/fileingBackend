import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerModule } from './customer/customer.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { SaleModule } from './sale/sale.module';
import { ConfigModule } from '@nestjs/config';
import { RentModule } from './rent/rent.module';
import { CustomersMahdoodeModule } from './customers-mahdoode/customers-mahdoode.module';



@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    TypeOrmModule.forRoot(),
    CustomerModule,
    AuthModule,
    SaleModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    RentModule,
    CustomersMahdoodeModule
  ],
})
export class AppModule { }
