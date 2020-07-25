import { Module } from '@nestjs/common';
import { WsGateway } from './ws.gateway';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [],
  providers: [WsGateway],
})
export class WsModule {}
