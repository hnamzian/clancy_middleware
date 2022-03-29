import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { I18nModule, I18nJsonParser } from 'nestjs-i18n';
import { WinstonModule } from 'nest-winston';
import { HttpLoggerMiddleware } from './core/http-logger.ts/http-logger.middleware';
import { WinstonConfigs } from './config/winston.config';
import { CoreModule } from './core/core.module';
import { ClancyModule } from './clancy/clancy.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from './config/typeorm-pg.config';
import { AuthModule } from './auth/auth.module';
import { AuthMiddleware } from './auth/middleware/auth.middleware';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './auth/guard/role.guard';

@Module({
  imports: [
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      parser: I18nJsonParser,

      parserOptions: {
        path: './locale/',
      },
    }),
    TypeOrmModule.forRoot(TypeOrmConfig),
    WinstonModule.forRoot(WinstonConfigs),
    CoreModule,
    ClancyModule,
    UserModule,
    AuthModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(HttpLoggerMiddleware).forRoutes('*');
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
