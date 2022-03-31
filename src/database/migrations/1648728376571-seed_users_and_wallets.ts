import { getRepository, MigrationInterface, QueryRunner } from 'typeorm';
import { Users } from '../seeds/users';
import { Wallets } from '../seeds/wallets';
import * as bcrypt from 'bcrypt';

export class seedAdminUserAndWallet1648709097111 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    Users.map((u) => (u.password = hashPassword(u.password)));
    await getRepository('users').save(Users);
    await getRepository('wallet').save(Wallets);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}

function hashPassword(password: string) {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
}
