export class CreatePetTable1789378569605 {
    name = 'CreatePetTable1789378569605';
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`pet\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`type\` varchar(255) NOT NULL, \`ownerId\` int NOT NULL, UNIQUE INDEX \`IDX_0f2e1d5c4a94071ffcfe1e7ec4\` (\`type\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`pet\` ADD CONSTRAINT \`FK_20acc45f799c122ec3735a3b8b1\` FOREIGN KEY (\`ownerId\`) REFERENCES \`owner\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`pet\` DROP FOREIGN KEY \`FK_20acc45f799c122ec3735a3b8b1\``);
        await queryRunner.query(`DROP INDEX \`IDX_0f2e1d5c4a94071ffcfe1e7ec4\` ON \`pet\``);
        await queryRunner.query(`DROP TABLE \`pet\``);
    }
}
//# sourceMappingURL=1789378569605-CreatePetTable.js.map