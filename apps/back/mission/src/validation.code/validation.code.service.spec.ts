import { Test, TestingModule } from '@nestjs/testing';
import { ValidationCodeService } from './validation.code.service';

describe('ValidationCodeService', () => {
  let service: ValidationCodeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ValidationCodeService],
    }).compile();

    service = module.get<ValidationCodeService>(ValidationCodeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
