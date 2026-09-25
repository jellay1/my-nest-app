import { MigrationInterface, QueryRunner } from "typeorm";
export declare class CreatePetTable1789378569605 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
