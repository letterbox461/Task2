import { MigrationInterface, QueryRunner } from "typeorm";

export class migration1662912818815 implements MigrationInterface {
    name = 'migration1662912818815'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "test" ADD "lastName" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "test" DROP COLUMN "lastName"`);
    }

}
