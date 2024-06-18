import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableTask1712771840252 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`    
            CREATE TABLE IF NOT EXISTS public.task
            (
                id SERIAL PRIMARY KEY,
                name character varying COLLATE pg_catalog."default" NOT NULL,
                description character varying COLLATE pg_catalog."default" NOT NULL,
                "parentId" integer,
                "typeId" integer NOT NULL,
                created_at timestamp with time zone DEFAULT now() NOT NULL,
                updated_at timestamp with time zone  DEFAULT now() NOT NULL
            )
        `);
    };

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE IF EXISTS public.task
        `);
    };
};
