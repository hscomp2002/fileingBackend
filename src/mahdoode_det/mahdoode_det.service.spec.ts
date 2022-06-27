import { Test, TestingModule } from '@nestjs/testing';
import { MahdoodeDetService } from './mahdoode_det.service';

describe('MahdoodeDetService', () => {
  let service: MahdoodeDetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MahdoodeDetService],
    }).compile();

    service = module.get<MahdoodeDetService>(MahdoodeDetService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
