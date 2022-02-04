import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IssueService } from './services/issue.service';
import { SocketModule } from '@nestjs/websockets/socket-module';

import { EventsGateway } from './services/socket.gateway';

@Module({
  imports: [HttpModule, ConfigModule.forRoot(), SocketModule],
  controllers: [AppController],
  providers: [AppService, IssueService, EventsGateway],
})
export class AppModule {}
