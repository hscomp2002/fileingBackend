import { Test, TestingModule } from '@nestjs/testing';
import { MahdoodeService } from './mahdoode.service';

describe('MahdoodeService', () => {
  let service: MahdoodeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MahdoodeService],
    }).compile();

    service = module.get<MahdoodeService>(MahdoodeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
