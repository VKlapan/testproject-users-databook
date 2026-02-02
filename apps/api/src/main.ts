import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MongoExceptionFilter } from './filters/mongo-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['http://localhost:5173', 'http://localhost:3000'],
    credentials: true,
  });
  app.useGlobalFilters(new MongoExceptionFilter());
  app.setGlobalPrefix(`api/${process.env.API_VERSION}`);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
