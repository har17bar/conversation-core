import { Module } from '@nestjs/common';
import { WsGateway } from './ws.gateway';
import { AuthModule } from '../auth/auth.module';
import { MediatorModule } from '../mediator/mediator.module';

@Module({
  imports: [AuthModule, MediatorModule],
  controllers: [],
  providers: [WsGateway],
})
export class WsModule {}
