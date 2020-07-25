import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';

@WebSocketGateway(4000)
export class WsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('WsGateway');

  @SubscribeMessage('join')
  handleMessage(client: Socket, payload): void {
    this.logger.log(`Client joined ID: ${client.id}`);
  }

  afterInit(server: Server) {}

  handleDisconnect(client) {
    this.logger.log(`Client disconnect ID: ${client.id}`);
  }

  handleConnection(client: Socket, args: any[]) {
    this.logger.log(`Client connected ID: ${client.id}`);
  }
}
