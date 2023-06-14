import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '@repairnow/prisma';

describe('AuthController', () => {
  let authController: AuthController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        // {
        // Example of how we can mock a service (do not remove pls)
        //   provide: AuthService,
        //   useValue: {
        //     getHello: jest
        //       .fn()
        //       .mockReturnValue('Hello World from auth service!'),
        //     getUsers: jest.fn(),
        //   },
        // },
        PrismaService,
        AuthService,
        JwtService,
      ],
    }).compile();

    authController = app.get<AuthController>(AuthController);
  });

  describe('root', () => {
    it('should return "Hello World from auth service!"', () => {
      expect(authController.getHello()).toBe('Hello World from auth service!');
    });
  });
});
