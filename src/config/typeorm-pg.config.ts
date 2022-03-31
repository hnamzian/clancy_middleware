import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from 'config';
import { Users } from 'src/user/user.entity';
import { Wallet } from 'src/wallet/wallet.entity';

export const TypeOrmConfig: TypeOrmModuleOptions = {
  type: config.get('db.type'),
  host: config.get('db.host'),
  port: config.get('db.port'),
  database: config.get('db.database'),
  username: config.get('db.username'),
  password: config.get('db.password'),
  entities: [Users, Wallet],
  synchronize: config.get('db.synchronize'),
};
