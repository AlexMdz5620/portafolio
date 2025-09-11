import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  app.enableCors({
    origin: [process.env.FRONT_URL_DEV, process.env.FRONT_URL],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    Credential: true,
  });
  await app.listen(process.env.PORT ?? 3000);
}

void bootstrap();
