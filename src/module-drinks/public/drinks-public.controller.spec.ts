import { Test, TestingModule } from '@nestjs/testing';
import { DrinksService } from '../drinks.service';
import { DrinksPublicController } from './drinks-public.controller';

describe('DrinksPublicController', () => {
  let controller: DrinksPublicController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DrinksPublicController],
      providers: [DrinksService],
    }).compile();

    controller = module.get<DrinksPublicController>(DrinksPublicController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
