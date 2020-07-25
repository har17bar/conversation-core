import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import * as config from 'config';

const JWT_CONFIG_SECRET = process.env.JWT_SECRET || config.get('jwt').secret;

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JWT_CONFIG_SECRET,
    });
  }

  async validate(jwtPayload) {
    const user = 'user'; // ToDo replace database fetching to validate user
    if (!user) {
      return null;
    }

    return user;
  }
}
