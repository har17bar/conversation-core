import { Module } from '@nestjs/common';
import { MediatorService } from './mediator.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import * as config from 'config';

const REDIS_CONFIG_URL = config.get('redis').url;

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'MIC_CLIENT',
        transport: Transport.REDIS,
        options: {
          url: REDIS_CONFIG_URL,
        },
      },
    ]),
  ],
  providers: [MediatorService],
  exports: [MediatorService],
})
export class MediatorModule {}
