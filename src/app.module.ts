import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerModule } from './customer/customer.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { SaleModule } from './sale/sale.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RentModule } from './rent/rent.module';
import { CustomersMahdoodeModule } from './customers-mahdoode/customers-mahdoode.module';
import { MahdoodeModule } from './mahdoode/mahdoode.module';
import { MahdoodeDetModule } from './mahdoode_det/mahdoode_det.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => {
        return {
          type: 'mysql',
          host: config.get('localhost'),
          port: config.get('3306'),
          username: config.get('DB_USER'),
          password: config.get('DB_PASSWORD'),
          database: config.get('DB_NAME'),
          entities: ['dist/**/*.entity{.ts,.js}'],
          synchronize: false,
        };
      },
      inject: [ConfigService],
    }),
    CustomerModule,
    AuthModule,
    SaleModule,
    RentModule,
    CustomersMahdoodeModule,
    MahdoodeModule,
    MahdoodeDetModule,
  ],
})
export class AppModule {}
