import { Module, Global } from '@nestjs/common';
import { databaseProviders } from './database.providers';
/** Global module providing database connection provider */
@Global()
@Module({
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
