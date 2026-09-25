import { MigrationInterface, QueryRunner } from "typeorm";
export declare class CreateOwner1789372907649 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
