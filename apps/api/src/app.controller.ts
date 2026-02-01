import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

/**
 * Application root controller
 */
@Controller()
export class AppController {
  /**
   * @param appService Application service
   */
  constructor(private readonly appService: AppService) {}

  @Get()
  /** Return greeting string */
  getHello(): string {
    return this.appService.getHello();
  }
} 
