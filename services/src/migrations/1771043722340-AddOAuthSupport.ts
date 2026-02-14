import { MigrationInterface, QueryRunner } from "typeorm";

export class AddOAuthSupport1771043722340 implements MigrationInterface {
    name = 'AddOAuthSupport1771043722340'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "age"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "isActive"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "googleId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_f382af58ab36057334fb262efd5" UNIQUE ("googleId")`);
        await queryRunner.query(`ALTER TABLE "users" ADD "avatar" character varying`);
        await queryRunner.query(`CREATE INDEX "IDX_f382af58ab36057334fb262efd" ON "users" ("googleId") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_f382af58ab36057334fb262efd"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "avatar"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_f382af58ab36057334fb262efd5"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "googleId"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "isActive" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "users" ADD "age" integer NOT NULL`);
    }

}
