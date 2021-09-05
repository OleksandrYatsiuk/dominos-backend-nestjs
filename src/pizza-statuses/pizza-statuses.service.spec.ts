import { Test, TestingModule } from '@nestjs/testing';
import { PizzaStatusesService } from './pizza-statuses.service';

describe('PizzaStatusesService', () => {
  let service: PizzaStatusesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PizzaStatusesService],
    }).compile();

    service = module.get<PizzaStatusesService>(PizzaStatusesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
