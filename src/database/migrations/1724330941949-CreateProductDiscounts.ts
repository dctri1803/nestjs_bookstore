import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateProductDiscounts1724330941949 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'productdiscounts',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'discountId',
            type: 'integer',
          },
          {
            name: 'productId',
            type: 'integer',
          },
        ],
      }),
    );
    await queryRunner.createForeignKey(
      'productdiscounts',
      new TableForeignKey({
        columnNames: ['discountId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'discounts',
        onDelete: 'CASCADE',
      }),
    );
    await queryRunner.createForeignKey(
      'productdiscounts',
      new TableForeignKey({
        columnNames: ['productId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'products',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('productdiscounts');
  }
}
