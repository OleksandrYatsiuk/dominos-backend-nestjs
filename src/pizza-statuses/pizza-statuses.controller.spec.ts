import { Test, TestingModule } from '@nestjs/testing';
import { PizzaStatusesController } from './pizza-statuses.controller';
import { PizzaStatusesService } from './pizza-statuses.service';

describe('PizzaStatusesController', () => {
  let controller: PizzaStatusesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PizzaStatusesController],
      providers: [PizzaStatusesService],
    }).compile();

    controller = module.get<PizzaStatusesController>(PizzaStatusesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
