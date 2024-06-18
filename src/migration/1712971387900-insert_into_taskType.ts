import { MigrationInterface, QueryRunner } from "typeorm";

export class InsertIntTaskType1712971387900 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO public."taskType" (type) VALUES 
                ('Story'),
                ('Bug'),
                ('Analise'),
                ('Implementacao Frontend'),
                ('Implementacao Backend'),
                ('Teste');
        `);
    };

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DELETE FROM public."taskType";
        `);
    };
};
