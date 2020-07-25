import { Inject, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserCredentialDto } from './dto/user-credential.dto';

export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  @Inject()
  private readonly jwtService: JwtService;

  async signIn(userCredentialDto: UserCredentialDto) {
    // ToDo add database fetching to validate user
    const token = this.jwtService.sign({
      name: userCredentialDto.name,
    });
    return {
      token,
    };
  }
  async signUp(userCredentialDto: UserCredentialDto) {
    // ToDo add database storing user
    const token = this.jwtService.sign({
      name: userCredentialDto.name,
    });
    return {
      token,
    };
  }
}
