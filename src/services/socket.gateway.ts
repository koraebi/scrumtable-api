import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;
  private logger: Logger = new Logger('EventsGateway');

  @SubscribeMessage('updateWebIssues')
  updateWebIssues(client: Socket, payload: string): void {
    this.server.emit('updateWebIssues', payload);
    this.logger.log('Socket message: updateWebIssues');
  }

  @SubscribeMessage('updateMobileIssues')
  updateMobileIssues(client: Socket, payload: string): void {
    this.server.emit('updateMobileIssues', payload);
    this.logger.log('Socket message: updateMobileIssues');
  }

  @SubscribeMessage('updateTabletIssues')
  updateTabletIssues(client: Socket, payload: string): void {
    this.server.emit('updateTabletIssues', payload);
    this.logger.log('Socket message: updateTabletIssues');
  }

  @SubscribeMessage('lockTabletIssue')
  lockMobileIssue(client: Socket, payload: string): void {
    this.server.emit('lockTabletIssue', payload);
    this.logger.log('Socket message: lockTabletIssue');
  }

  @SubscribeMessage('unlockMobileIssue')
  unlockMobileIssue(client: Socket, payload: string): void {
    this.server.emit('unlockTabletIssue', payload);
    this.logger.log('Socket message: unlockTabletIssue');
  }

  @SubscribeMessage('lockWebIssue')
  lockWebIssue(client: Socket, payload: string): void {
    this.server.emit('lockWebIssue', payload);
    this.logger.log('Socket message: lockWebIssue');
  }

  @SubscribeMessage('unlockWebIssue')
  unlockWebIssue(client: Socket, payload: string): void {
    this.server.emit('unlockWebIssue', payload);
    this.logger.log('Socket message: unlockWebIssue');
  }

  afterInit(server: Server) {
    this.logger.log('Init');
  }

  handleDisconnect(client: Socket) {
    this.logger.log('Client disconnected:' + client.id);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log('Client connected: ' + client.id);
  }
}
