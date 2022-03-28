import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import * as config from 'config'
import { User } from 'src/user/user.entity'

export const TypeOrmConfig: TypeOrmModuleOptions = {
  type: config.get('db.type'),
  host: config.get('db.host'),
  port: config.get('db.port'),
  database: config.get('db.database'),
  username: config.get('db.username'),
  password: config.get('db.password'),
  entities: [
    User,
  ],
  synchronize: config.get('db.synchronize')
}