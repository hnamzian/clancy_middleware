import * as config from 'config';

interface ISwaggerConfig {
  title: string;
  description: string;
  version: string;
  tag: string;
}

export const SwaggerConfig: ISwaggerConfig = {
  title: config.get('swagger.title'),
  description: config.get('swagger.description'),
  version: config.get('swagger.version'),
  tag: config.get('swagger.tag'),
};
