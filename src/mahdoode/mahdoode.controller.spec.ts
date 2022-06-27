import { Test, TestingModule } from '@nestjs/testing';
import { MahdoodeController } from './mahdoode.controller';
import { MahdoodeService } from './mahdoode.service';

describe('MahdoodeController', () => {
  let controller: MahdoodeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MahdoodeController],
      providers: [MahdoodeService],
    }).compile();

    controller = module.get<MahdoodeController>(MahdoodeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
