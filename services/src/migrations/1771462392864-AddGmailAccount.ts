import { MigrationInterface, QueryRunner } from "typeorm";

export class AddGmailAccount1771462392864 implements MigrationInterface {
    name = 'AddGmailAccount1771462392864'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "gmail_accounts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" character varying NOT NULL, "googleEmail" character varying(255) NOT NULL, "googleAccountId" character varying NOT NULL, "scope" text NOT NULL, "accessToken" text NOT NULL, "refreshToken" text, "expiresAt" TIMESTAMP NOT NULL, "isDefault" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_3fbe4d04b4da297697c56bbb3f9" UNIQUE ("userId", "googleEmail"), CONSTRAINT "PK_1af34ed9f4e51ef7f0f7531b706" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_cb97c8efb1abf1dbebd4b30aad" ON "gmail_accounts" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_b02161307a42836b4167c65cda" ON "gmail_accounts" ("googleAccountId") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_b02161307a42836b4167c65cda"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_cb97c8efb1abf1dbebd4b30aad"`);
        await queryRunner.query(`DROP TABLE "gmail_accounts"`);
    }

}
