import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterTableTaskToAddParentFK1713042618419 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE public.task
            ADD COLUMN IF NOT EXISTS "parentId" integer,
            ADD CONSTRAINT FK_task_parent FOREIGN KEY ("parentId") REFERENCES public.task(id);
        `);
    };

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE public.task
            DROP CONSTRAINT IF EXISTS FK_task_parent,
            DROP COLUMN IF EXISTS "parentId";
        `);
    };
};