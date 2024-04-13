import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableTaskType1712969387713 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Criar a tabela
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS public."taskType"
            (
                id integer NOT NULL DEFAULT nextval('taskType_id_seq'),
                type character varying COLLATE pg_catalog."default" NOT NULL,
                CONSTRAINT "PK_97d94edc34bd1a1d20fe621f581" PRIMARY KEY (id)
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
