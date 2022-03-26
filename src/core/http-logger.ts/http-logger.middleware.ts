import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { HttpLoggerFileStorage } from './http-logger-file-storage';

@Injectable()
export class HttpLoggerMiddleware implements NestMiddleware {
  private logger = new Logger(this.constructor.name);

  private loggerFileStorage: HttpLoggerFileStorage;

  constructor() {
    this.loggerFileStorage = new HttpLoggerFileStorage();
  }

  prepareHttpLog = (
    date,
    method,
    baseUrl,
    bodyString,
    statusCode,
    contentLength,
    userAgent,
    ip,
  ) => {
    const log = `[HTTP] ${date} ${method} ${baseUrl} ${bodyString} ${statusCode} ${contentLength} - ${userAgent} ${ip}`;
    return log;
  };

  use(request: Request, response: Response, next: NextFunction): void {
    const { ip, method, baseUrl, body } = request;

    const date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');

    const bodyString = JSON.stringify(body);

    const userAgent = request.get('user-agent') || '';

    response.on('finish', () => {
      const { statusCode } = response;
      const contentLength = response.get('content-length');

      const log = this.prepareHttpLog(
        date,
        method,
        baseUrl,
        bodyString,
        statusCode,
        contentLength,
        userAgent,
        ip,
      );

      this.logger.log(log);

      this.loggerFileStorage.append(log);
    });

    next();
  }
}
