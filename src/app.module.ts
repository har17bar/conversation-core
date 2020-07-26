import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { WsModule } from './ws/ws.module';
import { MediatorModule } from './mediator/mediator.module';

@Module({
  imports: [AuthModule, WsModule, MediatorModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
