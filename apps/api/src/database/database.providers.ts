import * as mongoose from 'mongoose';

/** Providers for database connection */
export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(`${process.env.MONGODB_STRING}`),
  },
];
