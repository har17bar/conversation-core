import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class WsGuard implements CanActivate {
  constructor(private authService: AuthService) {}
  canActivate(context: ExecutionContext) {
    const client = context.switchToWs().getClient();
    const token = client.handshake.query.token;
    try {
      this.authService.verifyToken(token);
      // ToDo add ensure user existence
    } catch (e) {
      return false;
    }
    return true;
  }
}
