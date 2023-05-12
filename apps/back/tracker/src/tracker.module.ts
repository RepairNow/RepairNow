import { Module } from '@nestjs/common';
import { TrackerController } from './tracker.controller';
import { TrackerService } from './tracker.service';

@Module({
  imports: [],
  controllers: [TrackerController],
  providers: [TrackerService],
})
export class TrackerModule {}
