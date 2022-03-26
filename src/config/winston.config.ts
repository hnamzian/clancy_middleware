import { utilities as nestWinstonModuleUtilities } from 'nest-winston';
import * as winston from 'winston';
import * as config from 'config';

const productConfigs = {
  transports: [
    new winston.transports.File({
      filename: config.get('logs.error.dir'),
      level: 'error',
      format: winston.format.combine(
        winston.format.timestamp(),
        nestWinstonModuleUtilities.format.nestLike(),
      ),
      maxFiles: config.get('logs.error.maxFiles'),
      maxsize: config.get('logs.error.maxsize'),
    }),
    new winston.transports.File({
      filename: config.get('logs.debug.dir'),
      level: 'debug',
      format: winston.format.combine(
        winston.format.timestamp(),
        nestWinstonModuleUtilities.format.nestLike(),
      ),
      maxFiles: config.get('logs.debug.maxFiles'),
      maxsize: config.get('logs.debug.maxsize'),
    }),
  ],
};

export const WinstonConfigs = productConfigs;
