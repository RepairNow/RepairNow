import { Test, TestingModule } from '@nestjs/testing';
import { ValicationCodeController } from './valication.code.controller';

describe('ValicationCodeController', () => {
  let controller: ValicationCodeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ValicationCodeController],
    }).compile();

    controller = module.get<ValicationCodeController>(ValicationCodeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
