import { Test, TestingModule } from '@nestjs/testing';
import { UsersManagementController } from './users-management.controller';
import { UsersManagementService } from './users-management.service';

describe('UsersManagementController', () => {
  let controller: UsersManagementController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersManagementController],
      providers: [UsersManagementService],
    }).compile();

    controller = module.get<UsersManagementController>(UsersManagementController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
