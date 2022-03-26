import { MiddlewareConsumer, Module } from '@nestjs/common';
import { I18nModule, I18nJsonParser } from 'nestjs-i18n';
import { WinstonModule } from 'nest-winston';
import { HttpLoggerMiddleware } from './core/http-logger.ts/http-logger.middleware';
import { WinstonConfigs } from './config/winston.config';
import { CoreModule } from './core/core.module';

@Module({
  imports: [
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      parser: I18nJsonParser,

      parserOptions: {
        path: './locale/',
      },
    }),
    WinstonModule.forRoot(WinstonConfigs),
    CoreModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(HttpLoggerMiddleware).forRoutes('*');
  }
}
