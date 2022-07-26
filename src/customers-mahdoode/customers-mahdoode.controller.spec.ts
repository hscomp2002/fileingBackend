import { Test, TestingModule } from '@nestjs/testing';
import { CustomersMahdoodeController } from './customers-mahdoode.controller';
import { CustomersMahdoodeService } from './customers-mahdoode.service';

describe('CustomersMahdoodeController', () => {
  let controller: CustomersMahdoodeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomersMahdoodeController],
      providers: [CustomersMahdoodeService],
    }).compile();

    controller = module.get<CustomersMahdoodeController>(
      CustomersMahdoodeController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
