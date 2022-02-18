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

  @SubscribeMessage('selectIssue')
  selectIssue(client: Socket, payload: string): void {
    this.server.emit('selectIssue', payload);
    this.logger.log('Socket message: selectIssue');
  }

  @SubscribeMessage('unselectIssue')
  unselectIssue(client: Socket, payload: string): void {
    this.server.emit('unselectIssue', payload);
    this.logger.log('Socket message: unselectIssue');
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

  @SubscribeMessage('unlockTabletIssue')
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
