import { Test, TestingModule } from '@nestjs/testing';
import { PepsPromServiceService } from './peps-prom-service.service';

describe('PepsPromServiceService', () => {
  let service: PepsPromServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PepsPromServiceService],
    }).compile();

    service = module.get<PepsPromServiceService>(PepsPromServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
