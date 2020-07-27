import { Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as config from 'config';
import { UserCredentialDto } from './dto/user-credential.dto';
import { MediatorService } from '../mediator/mediator.service';

const JWT_CONFIG_SECRET = process.env.JWT_SECRET || config.get('jwt').secret;

export class AuthService {
  @Inject()
  private readonly jwtService: JwtService;
  @Inject()
  private readonly mediatorService: MediatorService;

  async signIn(userCredentialDto: UserCredentialDto) {
    await this.mediatorService.invokeSlot({ service: 'user', slot: 'validatePassword' }, userCredentialDto);
    const token = this.jwtService.sign({
      name: userCredentialDto.name,
    });
    return {
      token,
    };
  }

  async signUp(userCredentialDto: UserCredentialDto) {
    await this.mediatorService.invokeSlot({ service: 'user', slot: 'create' }, userCredentialDto);
    const token = this.jwtService.sign({
      name: userCredentialDto.name,
    });
    return {
      token,
    };
  }

  async verifyToken(token: string) {
    return this.jwtService.verify(token, JWT_CONFIG_SECRET);
  }
}
