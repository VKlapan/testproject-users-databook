import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { SeedModule } from './seed/seed.module';

/** Root application module */
@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), DatabaseModule, UsersModule, SeedModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
