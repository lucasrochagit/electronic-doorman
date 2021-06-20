import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';
import * as morgan from 'morgan';

async function bootstrap() {
  const { HTTP_PORT } = process.env;
  const http_logger: Logger = new Logger('HTTPRequest');
  const app_logger: Logger = new Logger();

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use(
    morgan(
      'HTTP/:http-version :method :url with status :status in :response-time ms - :user-agent',
      {
        stream: { write: (str: string) => http_logger.log(str) },
      },
    ),
  );
  await app.listen(HTTP_PORT, () => {
    app_logger.log(`App running on port ${HTTP_PORT}`);
  });
}
bootstrap();
