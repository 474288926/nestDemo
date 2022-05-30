import { MigrationInterface, QueryRunner } from 'typeorm';

export class CoffeeRefactor1651543176548 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `alter table coffee change column name title varchar(16)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `alter table coffee change column title name varchar(16)`,
    );
  }
}
