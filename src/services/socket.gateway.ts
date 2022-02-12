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
  handleMobileMessage(client: Socket, payload: string): void {
    this.server.emit('updateWebIssues', payload);
  }

  @SubscribeMessage('updateMobileIssues')
  handleWebMessage(client: Socket, payload: string): void {
    this.server.emit('updateMobileIssues', payload);
  }

  @SubscribeMessage('lockMobileIssue')
  handleWebMessage(client: Socket, payload: string): void {
    this.server.emit('lockMobileIssue', payload);
  }

  @SubscribeMessage('unlockMobileIssue')
  handleWebMessage(client: Socket, payload: string): void {
    this.server.emit('unlockMobileIssue', payload);
  }

  @SubscribeMessage('lockWebIssue')
  handleWebMessage(client: Socket, payload: string): void {
    this.server.emit('lockWebIssue', payload);
  }

  @SubscribeMessage('unlockWebIssue')
  handleWebMessage(client: Socket, payload: string): void {
    this.server.emit('unlockWebIssue', payload);
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
