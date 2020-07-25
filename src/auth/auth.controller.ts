import { Controller, Post } from '@nestjs/common';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signIn')
  async signIn() {
    return this.authService.signIn();
  }

  @Post('/signUp')
  async signUp() {
    return this.authService.signUp();
  }
}
