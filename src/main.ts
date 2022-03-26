import { NestFactory } from '@nestjs/core';
import * as config from 'config';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { bootSwagger } from './boot/swagger.boot';

async function bootstrap() {
  const logger = new Logger(bootstrap.name);

  const app = await NestFactory.create(AppModule);

  // handle logging data using winston configuration in production
  // dev mode => log to console
  // prod mode => log to files
  if (process.env.NODE_ENV === 'production')
    app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

  // setup swagger api documentation
  bootSwagger(app);

  // enable global class validator
  app.useGlobalPipes(new ValidationPipe());

  app.enableCors({
    allowedHeaders: '*',
    origin: '*',
  });

  const port = config.get('server.port');
  await app.listen(port);

  logger.log(`Application is running on port ${port}`);
}
bootstrap();
