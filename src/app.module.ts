import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { WsModule } from './ws/ws.module';

@Module({
  imports: [AuthModule, WsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
