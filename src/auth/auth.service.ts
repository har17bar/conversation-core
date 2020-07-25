import { Inject, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as config from 'config';
import { UserCredentialDto } from './dto/user-credential.dto';

const JWT_CONFIG_SECRET = process.env.JWT_SECRET || config.get('jwt').secret;

export class AuthService {
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

  verifyToken(token: string) {
    return this.jwtService.verify(token, JWT_CONFIG_SECRET);
  }
}
