/**
 * Module providing JWT validation via Passport strategy.
 */
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    PassportModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET') || 'default_jwt_secret_change_me',
        signOptions: { expiresIn: config.get<string>('JWT_EXPIRES_IN') as any || '1h' },
      }),
    }),
  ],
  providers: [JwtStrategy],
})
export class AuthModule {}
