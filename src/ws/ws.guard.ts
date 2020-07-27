import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, Inject } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { WsException } from '@nestjs/websockets';

@Injectable()
export class WsGuard implements CanActivate {
  constructor(@Inject('MediatorService') private readonly mediatorService, private authService: AuthService) {}
  async canActivate(context: ExecutionContext) {
    const client = context.switchToWs().getClient();
    const token = client.handshake.query.token;
    try {
      const decoded = await this.authService.verifyToken(token);
      await this.mediatorService.invokeSlot({ service: 'user', slot: 'getByName' }, { name: decoded.name });
    } catch (e) {
      throw new WsException(e.message);
    }
    return true;
  }
}
