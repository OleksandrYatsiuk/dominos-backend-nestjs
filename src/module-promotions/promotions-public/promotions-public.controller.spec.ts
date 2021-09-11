import { Test, TestingModule } from '@nestjs/testing';
import { PromotionsPublicController } from './promotions-public.controller';

describe('PromotionsPublicController', () => {
  let controller: PromotionsPublicController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PromotionsPublicController],
    }).compile();

    controller = module.get<PromotionsPublicController>(PromotionsPublicController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
