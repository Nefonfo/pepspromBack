import { Test, TestingModule } from '@nestjs/testing';
import { SheetsStorageService } from './sheets-storage.service';

describe('SheetsStorageService', () => {
  let service: SheetsStorageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SheetsStorageService],
    }).compile();

    service = module.get<SheetsStorageService>(SheetsStorageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
