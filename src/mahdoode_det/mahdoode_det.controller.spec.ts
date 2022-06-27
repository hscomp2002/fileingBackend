import { Test, TestingModule } from '@nestjs/testing';
import { MahdoodeDetController } from './mahdoode_det.controller';
import { MahdoodeDetService } from './mahdoode_det.service';

describe('MahdoodeDetController', () => {
  let controller: MahdoodeDetController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MahdoodeDetController],
      providers: [MahdoodeDetService],
    }).compile();

    controller = module.get<MahdoodeDetController>(MahdoodeDetController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
