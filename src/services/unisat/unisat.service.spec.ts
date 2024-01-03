import { Test, TestingModule } from '@nestjs/testing';
import { UnisatService } from './unisat.service';

describe('UnisatService', () => {
  let service: UnisatService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UnisatService],
    }).compile();

    service = module.get<UnisatService>(UnisatService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
