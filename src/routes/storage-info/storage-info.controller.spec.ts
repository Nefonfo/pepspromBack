import { Test, TestingModule } from '@nestjs/testing';
import { StorageInfoController } from './storage-info.controller';

describe('StorageInfo Controller', () => {
  let controller: StorageInfoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StorageInfoController],
    }).compile();

    controller = module.get<StorageInfoController>(StorageInfoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
