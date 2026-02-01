import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';

/**
 * Global JWT auth guard that respects `@Public()` routes.
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  /**
   * Constructs the guard.
   * @param reflector Used to read `isPublic` metadata.
   */
  constructor(private reflector: Reflector) {
    super();
  }

  /**
   * Allows public handlers or defers to passport JWT guard.
   */
  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.get<boolean>('isPublic', context.getHandler());
    if (isPublic) {
      return true;
    }
    return super.canActivate(context) as any;
  }
} 
