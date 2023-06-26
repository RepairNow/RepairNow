import { Test, TestingModule } from '@nestjs/testing';
import { ValidationCodeController } from './validation.code.controller';

describe('ValidationCodeController', () => {
  let controller: ValidationCodeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ValidationCodeController],
    }).compile();

    controller = module.get<ValidationCodeController>(ValidationCodeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
