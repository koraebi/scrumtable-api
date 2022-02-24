import { Module } from '@nestjs/common';
import { EventsGateway } from './socket.gateway';

@Module({
  providers: [EventsGateway],
  exports: [EventsGateway],
})
export class EventsModule {}
