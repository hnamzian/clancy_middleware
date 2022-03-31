import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export class initUsersTable1648714234019 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'username',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'password',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'role',
            type: 'enum',
            enum: ['ADMIN', 'CLIENT'],
            isNullable: false,
          },
          {
            name: 'isVerified',
            type: 'boolean',
            isNullable: false,
          },
          {
            name: 'createdAt',
            type: 'DATE',
            default: 'now()'
          },
          {
            name: 'updatedAt',
            type: 'DATE',
            default: 'now()'
          }
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
