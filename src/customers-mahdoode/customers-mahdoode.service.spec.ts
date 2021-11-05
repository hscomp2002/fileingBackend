import { Test, TestingModule } from '@nestjs/testing';
import { CustomersMahdoodeService } from './customers-mahdoode.service';

describe('CustomersMahdoodeService', () => {
  let service: CustomersMahdoodeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomersMahdoodeService],
    }).compile();

    service = module.get<CustomersMahdoodeService>(CustomersMahdoodeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
