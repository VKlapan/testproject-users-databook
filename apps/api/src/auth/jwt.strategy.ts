import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

/**
 * Passport JWT strategy: extracts token from Authorization header.
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get<string>('JWT_SECRET') || 'default_jwt_secret_change_me',
    });
  }

  /**
   * Validates decoded JWT payload and returns user info attached to request.
   * @param payload Decoded JWT payload.
   */
  async validate(payload: any) {
    return { userId: payload.sub, email: payload.email };
  }
} 
