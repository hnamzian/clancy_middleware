import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class initWalletsTable1648727835387 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'wallet',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'walletName',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'address',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'userId',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'createdAt',
            type: 'DATE',
            default: 'now()',
          },
          {
            name: 'updatedAt',
            type: 'DATE',
            default: 'now()',
          },
        ],
      }),
      true,
    );

    const foreignKey = new TableForeignKey({
      columnNames: ['userId'],
      referencedColumnNames: ['id'],
      referencedTableName: 'users',
      onDelete: 'CASCADE',
    });
    await queryRunner.createForeignKey('wallet', foreignKey);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
