import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableTask1712771840252 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS public.task
            (
                id integer NOT NULL DEFAULT nextval('task_id_seq'),
                name character varying COLLATE pg_catalog."default" NOT NULL,
                description character varying COLLATE pg_catalog."default" NOT NULL,
                "parentId" integer,
                "typeId" integer NOT NULL,
                created_at timestamp with time zone DEFAULT now() NOT NULL,
                updated_at timestamp with time zone  DEFAULT now() NOT NULL,
                CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY (id)
            )
            TABLESPACE pg_default;
        `);
    };

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE IF EXISTS public.task
        `);
    };
};
