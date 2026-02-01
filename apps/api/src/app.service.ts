import { Injectable } from '@nestjs/common';

@Injectable()
/**
 * Application-level service providing generic utilities.
 */
export class AppService {
  /**
   * Return a simple greeting string
   */
  getHello(): string {
    return 'Hello World!';
  }
} 
