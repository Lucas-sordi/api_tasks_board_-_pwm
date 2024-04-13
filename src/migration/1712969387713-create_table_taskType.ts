import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableTaskType1712969387713 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Criar a tabela
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS public."taskType"
            (
                id SERIAL PRIMARY KEY,
                type character varying COLLATE pg_catalog."default" NOT NULL
            )
        `);

        // Definir o OWNER da tabela
        await queryRunner.query(`
            ALTER TABLE IF EXISTS public."taskType"
                OWNER to postgres;
        `);
    };

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE IF EXISTS public."taskType"
        `);
    };
};
