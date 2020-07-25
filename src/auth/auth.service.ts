import { Logger } from '@nestjs/common';

export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  async signIn() {}
  async signUp() {}
}
