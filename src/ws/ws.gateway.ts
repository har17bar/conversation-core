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
import * as config from 'config';

const wsConfig = config.get('ws');
console.log(wsConfig);

@WebSocketGateway(wsConfig.port)
export class WsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('Websocket');

  @SubscribeMessage('join')
  handleMessage(client: Socket, payload): void {
    this.logger.log(`Client joined ID: ${client.id}`);
  }

  afterInit(server: Server) {
    this.logger.log(`ws listening on port ${wsConfig.port}`);
  }

  handleDisconnect(client) {
    this.logger.log(`Client disconnect ID: ${client.id}`);
  }

  handleConnection(client: Socket, args: any[]) {
    this.logger.log(`Client connected ID: ${client.id}`);
  }
}
