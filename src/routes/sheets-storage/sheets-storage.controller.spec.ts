import { Test, TestingModule } from '@nestjs/testing';
import { SheetsStorageController } from './sheets-storage.controller';

describe('SheetsStorage Controller', () => {
  let controller: SheetsStorageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SheetsStorageController],
    }).compile();

    controller = module.get<SheetsStorageController>(SheetsStorageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
