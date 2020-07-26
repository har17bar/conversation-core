import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class MediatorService {
  constructor(@Inject('MIC_CLIENT') private readonly client: ClientProxy) {}
  async invokeSlot(pattern, payload) {
    return this.client
      .send(pattern, payload)
      .toPromise()
      .catch(err => {
        throw new InternalServerErrorException(err);
      });
  }
}
