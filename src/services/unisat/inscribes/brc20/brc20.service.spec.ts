import { Test, TestingModule } from '@nestjs/testing';
import { Brc20Service } from './brc20.service';

describe('Brc20Service', () => {
  let service: Brc20Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Brc20Service],
    }).compile();

    service = module.get<Brc20Service>(Brc20Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
