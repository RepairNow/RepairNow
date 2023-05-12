import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { TrackerModule } from '../src/tracker.module';

describe('TrackerController (e2e)', () => {
  let tracker: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TrackerModule],
    }).compile();

    tracker = moduleFixture.createNestApplication();
    await tracker.init();
  });

  it('/ (GET)', () => {
    return request(tracker.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
});
