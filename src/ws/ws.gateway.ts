import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Logger, UseGuards } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import * as config from 'config';
import { WsGuard } from './ws.guard';

const WS_CONFIG_PORT = config.get('ws').port;

@WebSocketGateway(WS_CONFIG_PORT)
export class WsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('Websocket');

  wsClients = new Map();

  @UseGuards(WsGuard)
  @SubscribeMessage('join')
  handleMessage(client: Socket, payload): void {
    this.logger.log(`Client joined ID: ${client.id}`);

    this.wsClients.set(payload.name, client);

    client.emit('message', { user: 'Administration', text: `${payload.name} have a great day` });
    this.broadcastBesideCurrent(payload.name, 'message', {
      user: 'Administration',
      text: `has Joined ${payload.name}`,
    });
  }

  @SubscribeMessage('message')
  sendMessage(client: Socket, payload): void {
    this.server.emit('message', { user: payload.name, text: payload.message });
  }

  afterInit(server: Server) {
    this.logger.log(`ws listening on port ${WS_CONFIG_PORT}`);
  }

  handleDisconnect(client) {
    this.logger.log(`Client disconnect ID: ${client.id}`);
  }

  handleConnection(client: Socket, args: any[]) {
    this.logger.log(`Client connected ID: ${client.id}`);
  }

  private broadcastBesideCurrent(userNameCurrent, event, message: any) {
    this.wsClients.forEach((client, userName) => {
      if (userNameCurrent !== userName) {
        client.emit(event, message);
      }
    });
  }
}
