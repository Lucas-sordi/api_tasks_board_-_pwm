import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterTableTaskToAddTaskTypeFK1713042562809 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE public.task
            ADD COLUMN IF NOT EXISTS "typeId" integer NOT NULL,
            ADD CONSTRAINT FK_task_type FOREIGN KEY ("typeId") REFERENCES public."taskType"(id);
        `);
    };

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE public.task
            DROP CONSTRAINT IF EXISTS FK_task_type,
            DROP COLUMN IF EXISTS "typeId";
        `);
    };
};
