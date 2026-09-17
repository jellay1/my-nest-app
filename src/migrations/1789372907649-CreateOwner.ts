import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateOwner1789372907649 implements MigrationInterface {
    name = 'CreateOwner1789372907649'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`owner\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_7431bbd2e694ee4a80c32bd7ef\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_7431bbd2e694ee4a80c32bd7ef\` ON \`owner\``);
        await queryRunner.query(`DROP TABLE \`owner\``);
    }

}

// This migration creates a new table called "owner" with columns for id, name, email, and password.