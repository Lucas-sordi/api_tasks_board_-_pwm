import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableUser1718640338490 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS public."user"
      (
          id SERIAL PRIMARY KEY,
          username character varying COLLATE pg_catalog."default" NOT NULL UNIQUE,
          password character varying COLLATE pg_catalog."default" NOT NULL,
          created_at timestamp with time zone DEFAULT now() NOT NULL,
          updated_at timestamp with time zone DEFAULT now() NOT NULL
      )
    `);
  };

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE public.task
      DROP CONSTRAINT IF EXISTS FK_task_user,
      DROP COLUMN IF EXISTS "userId";
    `);

    await queryRunner.query(`
      DROP TABLE IF EXISTS public."user"
    `);
  };

};
