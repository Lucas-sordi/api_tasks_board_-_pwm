import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterTableTaskToAddUserFK1718640441418 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE public.task
        ADD COLUMN IF NOT EXISTS "userId" integer NOT NULL,
        ADD CONSTRAINT FK_task_user FOREIGN KEY ("userId") REFERENCES public."user"(id);
    `);
  };

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE public.task
        DROP CONSTRAINT IF EXISTS FK_task_user,
        DROP COLUMN IF EXISTS "userId";
    `);
  };

};
