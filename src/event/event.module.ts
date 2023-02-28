import { Module } from '@nestjs/common';
import { EventController } from './event.controller';
import { EventService } from './event.service';

@Module({
  imports: [EventModule],
  controllers: [EventController],
  providers: [EventService],
})
export class EventModule {}
