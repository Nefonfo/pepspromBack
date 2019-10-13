import { Test, TestingModule } from '@nestjs/testing';
import { StorageInfoService } from './storage-info.service';

describe('StorageInfoService', () => {
  let service: StorageInfoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StorageInfoService],
    }).compile();

    service = module.get<StorageInfoService>(StorageInfoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
