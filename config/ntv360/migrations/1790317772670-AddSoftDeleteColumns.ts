import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSoftDeleteColumns1790317772670 implements MigrationInterface {
    name = 'AddSoftDeleteColumns1790317772670'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_0f2e1d5c4a94071ffcfe1e7ec4\` ON \`pet\``);
        await queryRunner.query(`ALTER TABLE \`owner\` ADD \`deletedAt\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`pet\` ADD \`deletedAt\` datetime(6) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`pet\` DROP COLUMN \`deletedAt\``);
        await queryRunner.query(`ALTER TABLE \`owner\` DROP COLUMN \`deletedAt\``);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_0f2e1d5c4a94071ffcfe1e7ec4\` ON \`pet\` (\`type\`)`);
    }

}
