export class CreateOwner1789372907649 {
    name = 'CreateOwner1789372907649';
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`owner\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_7431bbd2e694ee4a80c32bd7ef\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP INDEX \`IDX_7431bbd2e694ee4a80c32bd7ef\` ON \`owner\``);
        await queryRunner.query(`DROP TABLE \`owner\``);
    }
}
//# sourceMappingURL=1789372907649-CreateOwner.js.map