import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from './types/jwt-payload.type';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  email: any;
  userId: any;
  constructor() {
    const secret: string = process.env.JWT_SECRET ?? '';
    if (!secret) {
      throw new Error('token non reconnu');
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret,
    });
  }
  validate(payload: JwtPayload) {
    return { id: payload.userId, email: payload.email };
  }
}
